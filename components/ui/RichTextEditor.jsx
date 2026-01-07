'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import {
    Bold, Italic, Underline, List, ListOrdered,
    AlignLeft, AlignCenter, AlignRight, Quote, Code,
    Link as LinkIcon, Image as ImageIcon, Heading1, Heading2,
    Strikethrough, Undo, Redo, Eraser, Type
} from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder = "Write your content here...", rows = 16, error, name = 'description' }) => {
    const editorRef = useRef(null);
    const [activeFormats, setActiveFormats] = useState({});
    const [isEmpty, setIsEmpty] = useState(true);
    const [currentBlock, setCurrentBlock] = useState('p');

    // Initialize editor content
    useEffect(() => {
        if (editorRef.current && value && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
            setIsEmpty(!value || value.trim() === '' || value === '<br>');
        }
    }, []);

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

    // Handle content changes
    const handleInput = useCallback(() => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            const textContent = editorRef.current.textContent || '';
            setIsEmpty(!textContent.trim());

            onChange({
                target: {
                    name: name,
                    value: content
                }
            });
        }
    }, [onChange, name]);

    // Toggle heading (click again to remove)
    const toggleHeading = useCallback((level) => {
        const currentFormat = document.queryCommandValue('formatBlock');
        if (currentFormat.toLowerCase() === `h${level}`) {
            // Remove heading, convert to paragraph
            document.execCommand('formatBlock', false, 'p');
        } else {
            document.execCommand('formatBlock', false, `h${level}`);
        }
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

    // Insert image
    const insertImage = useCallback(() => {
        const url = prompt('Enter image URL:', 'https://');
        if (url) {
            const alt = prompt('Enter alt text:', 'Image');
            document.execCommand('insertHTML', false, `<img src="${url}" alt="${alt || 'Image'}" />`);
            editorRef.current?.focus();
            handleInput();
        }
    }, [handleInput]);

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

    // Handle paste - remove formatting
    const handlePaste = useCallback((e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
        handleInput();
    }, [handleInput]);

    // Toolbar button component
    const ToolbarButton = ({ icon: Icon, title, onClick, active = false, disabled = false, danger = false }) => (
        <button
            type="button"
            onClick={onClick}
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

                {/* Block Elements - Toggle behavior */}
                <ToolbarButton
                    icon={Quote}
                    title="Blockquote - Click again to remove"
                    onClick={toggleBlockquote}
                    active={isBlockquoteActive}
                />
                <ToolbarButton
                    icon={Code}
                    title="Code - Click again to remove"
                    onClick={toggleCode}
                />

                <Divider />

                {/* Insert Elements */}
                <ToolbarButton icon={LinkIcon} title="Insert/Remove Link" onClick={insertLink} />
                <ToolbarButton icon={ImageIcon} title="Insert Image" onClick={insertImage} />

                <Divider />

                {/* Clear Formatting */}
                <ToolbarButton
                    icon={Type}
                    title="Clear Formatting (removes bold, italic, etc.)"
                    onClick={clearFormatting}
                />
                <ToolbarButton
                    icon={Eraser}
                    title="Clear All Content"
                    onClick={clearAllContent}
                    danger
                />
            </div>

            {/* Editor Area */}
            <div className="relative">
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
