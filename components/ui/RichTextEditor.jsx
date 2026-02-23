'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import {
    Bold, Italic, Underline, List, ListOrdered,
    AlignLeft, AlignCenter, AlignRight, Quote, Code,
    Link as LinkIcon, Image as ImageIcon, Video, Upload, X,
    Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
    Strikethrough, Undo, Redo, Eraser, Type
} from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder = "Write your content here...", rows = 16, error, name = 'description', onUploadImage }) => {
    const editorRef = useRef(null);
    const savedSelectionRef = useRef(null);
    const imageInputRef = useRef(null);
    const [activeFormats, setActiveFormats] = useState({});
    const [isEmpty, setIsEmpty] = useState(true);
    const [currentBlock, setCurrentBlock] = useState('p');
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [imageDragActive, setImageDragActive] = useState(false);
    const [imageUrlInput, setImageUrlInput] = useState('');
    const [imageAltInput, setImageAltInput] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [videoUrlInput, setVideoUrlInput] = useState('');

    // Initialize and sync editor content when value loads (e.g. existing blog content when editing)
    useEffect(() => {
        if (!editorRef.current) return;
        const raw = value ?? '';
        const normalized = raw.trim() === '' ? '' : raw;
        if (editorRef.current.innerHTML !== normalized) {
            editorRef.current.innerHTML = normalized || '';
            setIsEmpty(!normalized || normalized === '<br>');
        }
    }, [value]);

    // Check which formats are active at cursor position
    const updateActiveFormats = useCallback(() => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        // Check inline formats
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            strikeThrough: document.queryCommandState('strikeThrough'),
            insertUnorderedList: document.queryCommandState('insertUnorderedList'),
            insertOrderedList: document.queryCommandState('insertOrderedList'),
            justifyLeft: document.queryCommandState('justifyLeft'),
            justifyCenter: document.queryCommandState('justifyCenter'),
            justifyRight: document.queryCommandState('justifyRight'),
        });

        // Check block format
        const blockFormat = document.queryCommandValue('formatBlock');
        setCurrentBlock(blockFormat || 'p');
    }, []);

    // Execute formatting command (toggle behavior)
    const execCommand = useCallback((command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        updateActiveFormats();
        handleInput();
    }, []);

    // Normalize heading tags to lowercase so they render correctly on the blog page (some browsers output <H1> etc.)
    const normalizeHeadingTags = useCallback((html) => {
        if (typeof html !== 'string') return html;
        return html.replace(/<\/?([Hh][1-6])>/g, (match) => match.toLowerCase());
    }, []);

    // Handle content changes
    const handleInput = useCallback(() => {
        if (editorRef.current) {
            let content = editorRef.current.innerHTML;
            content = normalizeHeadingTags(content);
            const textContent = editorRef.current.textContent || '';
            setIsEmpty(!textContent.trim());

            onChange({
                target: {
                    name: name,
                    value: content
                }
            });
        }
    }, [onChange, name, normalizeHeadingTags]);

    // Toggle heading (click again to remove). Force real h1-h6 tags so they render on the blog page (some browsers ignore formatBlock or output wrong casing).
    const toggleHeading = useCallback((level) => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
            editorRef.current?.focus();
            return;
        }
        const range = sel.getRangeAt(0);
        const block = range.commonAncestorContainer.nodeType === 3
            ? range.commonAncestorContainer.parentElement
            : range.commonAncestorContainer;
        const blockEl = block?.closest?.('h1, h2, h3, h4, h5, h6, p, div');
        const currentTag = blockEl?.tagName?.toLowerCase() || '';

        if (currentTag === `h${level}`) {
            document.execCommand('formatBlock', false, 'p');
        } else {
            document.execCommand('formatBlock', false, `h${level}`);
            // Ensure we have a real heading tag (some browsers output wrong casing or ignore formatBlock)
            const blockAfter = (() => {
                const r = window.getSelection();
                if (!r || r.rangeCount === 0) return null;
                const anc = r.getRangeAt(0).commonAncestorContainer;
                const node = anc.nodeType === 3 ? anc.parentElement : anc;
                return node?.closest?.('h1, h2, h3, h4, h5, h6, p, div');
            })();
            if (blockAfter && blockAfter.tagName && !/^H[1-6]$/i.test(blockAfter.tagName)) {
                const newHeading = document.createElement(`h${level}`);
                newHeading.innerHTML = blockAfter.innerHTML;
                blockAfter.parentNode?.replaceChild(newHeading, blockAfter);
            }
        }
        editorRef.current?.focus();
        updateActiveFormats();
        handleInput();
    }, [handleInput, updateActiveFormats]);

    // Set current block to paragraph (p)
    const setParagraph = useCallback(() => {
        document.execCommand('formatBlock', false, 'p');
        editorRef.current?.focus();
        updateActiveFormats();
        handleInput();
    }, [handleInput, updateActiveFormats]);

    // Toggle blockquote
    const toggleBlockquote = useCallback(() => {
        const currentFormat = document.queryCommandValue('formatBlock');
        if (currentFormat.toLowerCase() === 'blockquote') {
            document.execCommand('formatBlock', false, 'p');
        } else {
            document.execCommand('formatBlock', false, 'blockquote');
        }
        editorRef.current?.focus();
        updateActiveFormats();
        handleInput();
    }, [handleInput, updateActiveFormats]);

    // Insert/toggle code
    const toggleCode = useCallback(() => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const parentCode = range.commonAncestorContainer.parentElement?.closest('code');

        if (parentCode) {
            // Remove code formatting - replace code element with its text content
            const textNode = document.createTextNode(parentCode.textContent || '');
            parentCode.parentNode?.replaceChild(textNode, parentCode);
            // Select the text node
            const newRange = document.createRange();
            newRange.selectNodeContents(textNode);
            selection.removeAllRanges();
            selection.addRange(newRange);
        } else {
            // Add code formatting
            const selectedText = selection.toString() || 'code';
            document.execCommand('insertHTML', false, `<code>${selectedText}</code>`);
        }

        editorRef.current?.focus();
        handleInput();
    }, [handleInput]);

    // Insert link
    const insertLink = useCallback(() => {
        const selection = window.getSelection();
        const selectedText = selection?.toString() || '';

        // Check if already a link
        const range = selection?.getRangeAt(0);
        const parentLink = range?.commonAncestorContainer.parentElement?.closest('a');

        if (parentLink) {
            // Remove link - unlink command
            document.execCommand('unlink', false, null);
        } else {
            const url = prompt('Enter URL:', 'https://');
            if (url) {
                if (selectedText) {
                    document.execCommand('createLink', false, url);
                } else {
                    const linkText = prompt('Enter link text:', 'Link');
                    if (linkText) {
                        document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${linkText}</a>`);
                    }
                }
            }
        }

        editorRef.current?.focus();
        handleInput();
    }, [handleInput]);

    // Insert image HTML at current (or saved) cursor position
    const insertImageAtCursor = useCallback((url, alt = 'Image') => {
        const safeUrl = String(url).trim().replace(/"/g, '&quot;');
        const safeAlt = String(alt || 'Image').replace(/"/g, '&quot;');
        const html = `<p><img src="${safeUrl}" alt="${safeAlt}" style="max-width: 100%; height: auto;" /></p>`;
        editorRef.current?.focus();
        const sel = window.getSelection();
        if (savedSelectionRef.current && sel) {
            try {
                sel.removeAllRanges();
                sel.addRange(savedSelectionRef.current);
            } catch (_) { /* ignore */ }
        }
        document.execCommand('insertHTML', false, html);
        handleInput();
    }, [handleInput]);

    const openImageModal = useCallback(() => {
        const sel = window.getSelection();
        if (editorRef.current && sel && sel.rangeCount > 0) {
            try {
                savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
            } catch (_) { savedSelectionRef.current = null; }
        } else {
            savedSelectionRef.current = null;
            // Ensure editor has focus so insertion has a valid cursor on first use
            editorRef.current?.focus();
        }
        setImageUrlInput('');
        setImageAltInput('');
        setImageModalOpen(true);
    }, []);

    const closeImageModal = useCallback(() => {
        setImageModalOpen(false);
        setImageDragActive(false);
        setImageUploading(false);
        setImageUrlInput('');
        setImageAltInput('');
        if (imageInputRef.current) imageInputRef.current.value = '';
        editorRef.current?.focus();
    }, []);

    const handleImageFile = useCallback(async (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        if (onUploadImage) {
            setImageUploading(true);
            try {
                const url = await onUploadImage(file);
                if (url) {
                    insertImageAtCursor(url, imageAltInput || file.name || 'Image');
                    closeImageModal();
                }
            } catch (err) {
                console.error('Image upload failed:', err);
                alert(err?.message || 'Upload failed.');
            } finally {
                setImageUploading(false);
            }
        } else {
            alert('Upload is not configured. Use "Or paste URL" to add an image link.');
        }
    }, [onUploadImage, imageAltInput, insertImageAtCursor, closeImageModal]);

    const insertImageFromUrl = useCallback(() => {
        const url = imageUrlInput?.trim();
        if (!url) return;
        insertImageAtCursor(url, imageAltInput || 'Image');
        closeImageModal();
    }, [imageUrlInput, imageAltInput, insertImageAtCursor, closeImageModal]);

    // Parse YouTube/Vimeo URL to embed src
    const getVideoEmbedSrc = (url) => {
        const u = url.trim();
        const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (ytMatch) return { src: `https://www.youtube.com/embed/${ytMatch[1]}`, title: 'YouTube' };
        const vimeoMatch = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (vimeoMatch) return { src: `https://player.vimeo.com/video/${vimeoMatch[1]}`, title: 'Vimeo' };
        if (u.includes('youtube.com/embed/')) return { src: u, title: 'YouTube' };
        return null;
    };

    const openVideoModal = useCallback(() => {
        const sel = window.getSelection();
        if (editorRef.current && sel && sel.rangeCount > 0) {
            try {
                savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
            } catch (_) { savedSelectionRef.current = null; }
        } else {
            savedSelectionRef.current = null;
            editorRef.current?.focus();
        }
        setVideoUrlInput('');
        setVideoModalOpen(true);
    }, []);

    const closeVideoModal = useCallback(() => {
        setVideoModalOpen(false);
        setVideoUrlInput('');
        editorRef.current?.focus();
    }, []);

    // Insert video embed at cursor (YouTube / Vimeo) — restores saved selection so it works in middle of content
    const insertVideoAtCursor = useCallback((url) => {
        const embed = getVideoEmbedSrc(url);
        if (!embed) return false;
        const safeSrc = String(embed.src).replace(/"/g, '&quot;');
        const safeTitle = String(embed.title || 'Video').replace(/"/g, '&quot;');
        const iframeHtml = `<p class="video-embed-wrapper"><iframe src="${safeSrc}" title="${safeTitle}" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="max-width: 100%; border-radius: 8px;"></iframe></p>`;
        editorRef.current?.focus();
        const sel = window.getSelection();
        if (savedSelectionRef.current && sel) {
            try {
                sel.removeAllRanges();
                sel.addRange(savedSelectionRef.current);
            } catch (_) { /* ignore */ }
        }
        document.execCommand('insertHTML', false, iframeHtml);
        handleInput();
        return true;
    }, [handleInput]);

    const insertVideoFromModal = useCallback(() => {
        const url = videoUrlInput?.trim();
        if (!url) return;
        if (insertVideoAtCursor(url)) {
            closeVideoModal();
        } else {
            alert('Please enter a valid YouTube or Vimeo URL.');
        }
    }, [videoUrlInput, insertVideoAtCursor, closeVideoModal]);

    // Clear ALL formatting from selected text
    const clearFormatting = useCallback(() => {
        document.execCommand('removeFormat', false, null);
        document.execCommand('formatBlock', false, 'p');
        editorRef.current?.focus();
        updateActiveFormats();
        handleInput();
    }, [handleInput, updateActiveFormats]);

    // Clear all content
    const clearAllContent = useCallback(() => {
        if (confirm('Are you sure you want to clear all content?')) {
            if (editorRef.current) {
                editorRef.current.innerHTML = '';
                setIsEmpty(true);
                handleInput();
            }
        }
    }, [handleInput]);

    // Handle keyboard shortcuts
    const handleKeyDown = useCallback((e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    execCommand('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    execCommand('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    execCommand('underline');
                    break;
                case 'z':
                    if (e.shiftKey) {
                        e.preventDefault();
                        execCommand('redo');
                    } else {
                        e.preventDefault();
                        execCommand('undo');
                    }
                    break;
            }
        }
    }, [execCommand]);

    // Handle paste — strip formatting for text; if image and onUploadImage provided, save selection, upload, insert at cursor
    const handlePaste = useCallback(async (e) => {
        const items = e.clipboardData?.items;
        const file = items && Array.from(items).find(item => item.kind === 'file' && item.type.startsWith('image/'));
        if (file && onUploadImage) {
            e.preventDefault();
            const sel = window.getSelection();
            if (editorRef.current && sel && sel.rangeCount > 0) {
                try {
                    savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
                } catch (_) { savedSelectionRef.current = null; }
            }
            const blob = file.getAsFile();
            if (!blob) return;
            try {
                const url = await onUploadImage(blob);
                if (url) {
                    insertImageAtCursor(url, 'Pasted image');
                }
            } catch (err) {
                console.error('Paste image upload failed:', err);
                document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
                handleInput();
            }
            return;
        }
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
        handleInput();
    }, [handleInput, onUploadImage, insertImageAtCursor]);

    // Toolbar button component — use onMouseDownPrevent to stop first click being stolen by contentEditable focus (e.g. Image/Video)
    const ToolbarButton = ({ icon: Icon, title, onClick, active = false, disabled = false, danger = false, preventFocusSteal = false }) => (
        <button
            type="button"
            onClick={onClick}
            onMouseDown={preventFocusSteal ? (e) => e.preventDefault() : undefined}
            disabled={disabled}
            className={`p-2 rounded-lg transition-all ${danger
                ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                : active
                    ? 'bg-violet-100 text-violet-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={title}
        >
            <Icon size={18} strokeWidth={2} />
        </button>
    );

    // Toolbar divider
    const Divider = () => <div className="w-px h-6 bg-gray-300 mx-1" />;

    // Get stats
    const getStats = useCallback(() => {
        const text = editorRef.current?.textContent || '';
        return {
            chars: text.length,
            words: text.trim() ? text.trim().split(/\s+/).length : 0
        };
    }, []);

    const [stats, setStats] = useState({ chars: 0, words: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(getStats());
        }, 500);
        return () => clearInterval(interval);
    }, [getStats]);

    // Check if heading is active
    const isHeadingActive = (level) => currentBlock.toLowerCase() === `h${level}`;
    const isBlockquoteActive = currentBlock.toLowerCase() === 'blockquote';

    return (
        <div className={`border rounded-xl overflow-hidden transition-all ${error ? 'border-red-500' : 'border-gray-300 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20'}`}>
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex flex-wrap items-center gap-0.5">
                {/* Undo/Redo */}
                <ToolbarButton icon={Undo} title="Undo (Ctrl+Z)" onClick={() => execCommand('undo')} />
                <ToolbarButton icon={Redo} title="Redo (Ctrl+Shift+Z)" onClick={() => execCommand('redo')} />

                <Divider />

                {/* Text Formatting - All toggle on/off */}
                <ToolbarButton
                    icon={Bold}
                    title="Bold (Ctrl+B) - Click again to remove"
                    onClick={() => execCommand('bold')}
                    active={activeFormats.bold}
                />
                <ToolbarButton
                    icon={Italic}
                    title="Italic (Ctrl+I) - Click again to remove"
                    onClick={() => execCommand('italic')}
                    active={activeFormats.italic}
                />
                <ToolbarButton
                    icon={Underline}
                    title="Underline (Ctrl+U) - Click again to remove"
                    onClick={() => execCommand('underline')}
                    active={activeFormats.underline}
                />
                <ToolbarButton
                    icon={Strikethrough}
                    title="Strikethrough - Click again to remove"
                    onClick={() => execCommand('strikeThrough')}
                    active={activeFormats.strikeThrough}
                />

                <Divider />

                {/* Headings - Toggle behavior */}
                <ToolbarButton
                    icon={Heading1}
                    title="Heading 1 - Click again to remove"
                    onClick={() => toggleHeading(1)}
                    active={isHeadingActive(1)}
                />
                <ToolbarButton
                    icon={Heading2}
                    title="Heading 2 - Click again to remove"
                    onClick={() => toggleHeading(2)}
                    active={isHeadingActive(2)}
                />
                <ToolbarButton
                    icon={Heading3}
                    title="Heading 3 - Click again to remove"
                    onClick={() => toggleHeading(3)}
                    active={isHeadingActive(3)}
                />
                <ToolbarButton
                    icon={Heading4}
                    title="Heading 4 - Click again to remove"
                    onClick={() => toggleHeading(4)}
                    active={isHeadingActive(4)}
                />
                <ToolbarButton
                    icon={Heading5}
                    title="Heading 5 - Click again to remove"
                    onClick={() => toggleHeading(5)}
                    active={isHeadingActive(5)}
                />
                <ToolbarButton
                    icon={Heading6}
                    title="Heading 6 - Click again to remove"
                    onClick={() => toggleHeading(6)}
                    active={isHeadingActive(6)}
                />
                <ToolbarButton
                    icon={Type}
                    title="Paragraph (normal text)"
                    onClick={setParagraph}
                    active={currentBlock.toLowerCase() === 'p'}
                />

                <Divider />

                {/* Lists - Toggle behavior built-in */}
                <ToolbarButton
                    icon={List}
                    title="Bullet List - Click again to remove"
                    onClick={() => execCommand('insertUnorderedList')}
                    active={activeFormats.insertUnorderedList}
                />
                <ToolbarButton
                    icon={ListOrdered}
                    title="Numbered List - Click again to remove"
                    onClick={() => execCommand('insertOrderedList')}
                    active={activeFormats.insertOrderedList}
                />

                <Divider />

                {/* Alignment */}
                <ToolbarButton
                    icon={AlignLeft}
                    title="Align Left"
                    onClick={() => execCommand('justifyLeft')}
                    active={activeFormats.justifyLeft}
                />
                <ToolbarButton
                    icon={AlignCenter}
                    title="Align Center"
                    onClick={() => execCommand('justifyCenter')}
                    active={activeFormats.justifyCenter}
                />
                <ToolbarButton
                    icon={AlignRight}
                    title="Align Right"
                    onClick={() => execCommand('justifyRight')}
                    active={activeFormats.justifyRight}
                />

                <Divider />
                           
                

                <Divider />

                {/* Insert Elements — preventFocusSteal so first click isn't consumed by contentEditable focus */}
                <ToolbarButton icon={LinkIcon} title="Insert/Remove Link" onClick={insertLink} />
                <ToolbarButton icon={ImageIcon} title="Insert Image — upload or paste URL (inserts at cursor)" onClick={openImageModal} preventFocusSteal />
                <ToolbarButton icon={Video} title="Insert Video — YouTube or Vimeo URL (inserts at cursor)" onClick={openVideoModal} preventFocusSteal />

                <Divider />

              
            </div>

            {/* Video insert modal — paste YouTube/Vimeo URL, inserts at cursor */}
            {videoModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeVideoModal}>
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Insert video</h3>
                            <button type="button" onClick={closeVideoModal} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700" aria-label="Close">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            <p className="text-sm text-gray-600">Paste a YouTube or Vimeo URL. The video will be inserted at your cursor position in the content.</p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                                <input
                                    type="url"
                                    value={videoUrlInput}
                                    onChange={e => setVideoUrlInput(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-900"
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={insertVideoFromModal}
                                    disabled={!videoUrlInput?.trim()}
                                    className="flex-1 px-4 py-2.5 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Insert video
                                </button>
                                <button type="button" onClick={closeVideoModal} className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Image insert modal – drag & drop or paste URL */}
            {imageModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeImageModal}>
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Insert image</h3>
                            <button type="button" onClick={closeImageModal} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700" aria-label="Close">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            {/* Drag and drop */}
                            <div
                                onDragOver={e => { e.preventDefault(); e.stopPropagation(); setImageDragActive(true); }}
                                onDragLeave={e => { e.preventDefault(); e.stopPropagation(); setImageDragActive(false); }}
                                onDrop={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setImageDragActive(false);
                                    const file = e.dataTransfer.files?.[0];
                                    if (file) handleImageFile(file);
                                }}
                                onClick={() => imageInputRef.current?.click()}
                                className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${imageDragActive ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:border-violet-400 hover:bg-violet-50/50'}`}
                            >
                                <input
                                    ref={imageInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f); e.target.value = ''; }}
                                    disabled={imageUploading}
                                />
                                {imageUploading ? (
                                    <div className="w-10 h-10 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mb-2" />
                                ) : (
                                    <div className="p-3 bg-violet-100 rounded-xl mb-2">
                                        <Upload className="text-violet-600" size={28} />
                                    </div>
                                )}
                                <p className="text-sm text-gray-600">
                                    {imageUploading ? 'Uploading…' : <>Drag & drop or <span className="font-semibold text-violet-600">click to upload</span></>}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">Image is inserted at your cursor. PNG, JPG, WebP up to 10MB</p>
                            </div>
                            {/* Or paste URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Or paste URL</label>
                                <input
                                    type="url"
                                    value={imageUrlInput}
                                    onChange={e => setImageUrlInput(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alt text (optional)</label>
                                <input
                                    type="text"
                                    value={imageAltInput}
                                    onChange={e => setImageAltInput(e.target.value)}
                                    placeholder="Describe the image for accessibility"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-900"
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={insertImageFromUrl}
                                    disabled={!imageUrlInput?.trim()}
                                    className="flex-1 px-4 py-2.5 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Insert from URL
                                </button>
                                <button type="button" onClick={closeImageModal} className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Editor Area - scrollable when content exceeds max height */}
            <div className="relative max-h-[32rem] overflow-y-auto">
                <div
                    ref={editorRef}
                    contentEditable
                    className="w-full px-4 py-4 focus:outline-none text-gray-900 prose prose-sm max-w-none"
                    style={{ minHeight: `${rows * 1.5}rem` }}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    onMouseUp={updateActiveFormats}
                    onKeyUp={updateActiveFormats}
                    onFocus={updateActiveFormats}
                    suppressContentEditableWarning={true}
                />
                {/* Placeholder */}
                {isEmpty && (
                    <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                        {placeholder}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{stats.chars} characters</span>
                    <span>{stats.words} words</span>
                </div>
                <div className="text-xs text-gray-400 hidden sm:flex items-center gap-2">
                    <span className="text-gray-500 font-medium">Tip:</span> Click any format button again to toggle it off
                </div>
            </div>

            {/* Styles */}
            <style jsx global>{`
                [contenteditable] {
                    line-height: 1.6;
                }
                [contenteditable] h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 0.75rem 0;
                    color: #111827;
                    line-height: 1.2;
                }
                [contenteditable] h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 0.75rem 0;
                    color: #1f2937;
                    line-height: 1.3;
                }
                [contenteditable] h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 0.5rem 0;
                    color: #374151;
                }
                [contenteditable] h4 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin: 0.5rem 0;
                    color: #4b5563;
                }
                [contenteditable] h5 {
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 0.5rem 0;
                    color: #4b5563;
                }
                [contenteditable] h6 {
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin: 0.5rem 0;
                    color: #6b7280;
                    text-transform: uppercase;
                }
                [contenteditable] p {
                    margin: 0.5rem 0;
                }
                [contenteditable] blockquote {
                    border-left: 4px solid #8b5cf6;
                    padding: 0.75rem 1rem;
                    margin: 0.75rem 0;
                    color: #6b7280;
                    font-style: italic;
                    background: #faf5ff;
                    border-radius: 0 0.5rem 0.5rem 0;
                }
                [contenteditable] ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin: 0.5rem 0;
                }
                [contenteditable] ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin: 0.5rem 0;
                }
                [contenteditable] li {
                    margin: 0.25rem 0;
                }
                [contenteditable] a {
                    color: #7c3aed;
                    text-decoration: underline;
                    cursor: pointer;
                }
                [contenteditable] code {
                    background: #f3e8ff;
                    padding: 0.125rem 0.375rem;
                    border-radius: 0.25rem;
                    font-family: ui-monospace, monospace;
                    font-size: 0.875em;
                    color: #7c3aed;
                    border: 1px solid #e9d5ff;
                }
                [contenteditable] img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 0.75rem 0;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                }
                [contenteditable] iframe,
                [contenteditable] .video-embed-wrapper {
                    max-width: 100%;
                    margin: 0.75rem 0;
                    border-radius: 0.5rem;
                    overflow: hidden;
                }
                [contenteditable] .video-embed-wrapper iframe {
                    aspect-ratio: 16/9;
                    width: 100%;
                    height: auto;
                    min-height: 200px;
                }
                [contenteditable]:focus {
                    outline: none;
                }
                [contenteditable] *::selection {
                    background: #ddd6fe;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
