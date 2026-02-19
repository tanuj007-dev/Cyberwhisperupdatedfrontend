"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  BarChart2,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import BrochureFormModal from "./BrochureFormModal";
import EnrollModal from "./EnrollModal";
import { useEnquiry } from "../context/EnquiryContext";
import {
  useVisibleCount,
  useSliderSwipe,
  getCardWidthStyle,
} from "../context/useSliderSwipe";
import { API_BASE_URL } from '../../lib/apiConfig';
// Import assets
import thumb1 from "./assets/cyber_lab_1.webp";
import thumb2 from "./assets/cyber_lab_2.webp";
import thumb3 from "./assets/cyber_lab_3.webp";

const defaultImage = thumb1;

export default function CourseSection() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [brochureCourse, setBrochureCourse] = useState(null);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollCourseTitle, setEnrollCourseTitle] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const visibleCount = useVisibleCount();
  const { openEnquiry } = useEnquiry();

  const totalSlides = Math.max(1, Math.ceil(courses.length / visibleCount));
  const canGoPrev = slideIndex > 0;
  const canGoNext = slideIndex < totalSlides - 1;
  const goPrev = useCallback(
    () => setSlideIndex((i) => Math.max(0, i - 1)),
    [],
  );
  const goNext = useCallback(
    () => setSlideIndex((i) => Math.min(totalSlides - 1, i + 1)),
    [totalSlides],
  );
  const swipeHandlers = useSliderSwipe(slideIndex, totalSlides, goPrev, goNext);
  const cardWidthStyle = getCardWidthStyle(totalSlides, visibleCount);
  const slideChunks = React.useMemo(() => {
    const chunks = [];
    for (let i = 0; i < totalSlides; i++) {
      chunks.push(courses.slice(i * visibleCount, (i + 1) * visibleCount));
    }
    return chunks;
  }, [courses, totalSlides, visibleCount]);

  const openEnrollModal = (title) => {
    setEnrollCourseTitle(title || "");
    setEnrollModalOpen(true);
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch courses when active category changes
  useEffect(() => {
    if (activeCategory) {
      fetchCourses(activeCategory);
    }
  }, [activeCategory]);

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/courses?page=1&limit=100`, { cache: 'no-store' });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }

      const data = await response.json();

      // API returns { success, data: [...] } or { success, courses: [...] }
      const rawList = Array.isArray(data.data) ? data.data : (Array.isArray(data.courses) ? data.courses : []);
      const categoryLabel = (c) => c.category ?? (c.category_id != null ? `Category ${c.category_id}` : "General");
      const uniqueCategories = ["All", ...new Set(rawList.map(categoryLabel).filter(Boolean))];

      if (uniqueCategories.length > 0) {
        setCategories(uniqueCategories);
        setActiveCategory(uniqueCategories[0]);
      } else {
        setCategories(["All"]);
        setActiveCategory("All");
      }
    } catch (err) {
      console.warn("API unavailable, using fallback categories:", err.message);
      setCategories(["All"]);
      setActiveCategory("All");
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchCourses = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/courses?page=1&limit=50`, { cache: 'no-store' });

      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
      }

      const data = await response.json();

      // API returns { success, data: [...] } or { success, courses: [...] }
      const rawList = Array.isArray(data.data) ? data.data : (Array.isArray(data.courses) ? data.courses : []);
      const categoryLabel = (c) => c.category ?? (c.category_id != null ? `Category ${c.category_id}` : "General");

      const filteredCourses =
        !category || category === "All"
          ? rawList
          : rawList.filter((course) => categoryLabel(course) === category);

      const processedCourses = filteredCourses.map((course) => ({
        ...course,
        category: categoryLabel(course),
        image:
          course.thumbnail ||
          course.course_thumbnail ||
          course.thumbnail_url ||
          course.image ||
          defaultImage,
        rating: course.rating || 4.5,
        level: course.level || "Beginner",
        duration: course.duration || "3 Weeks",
        price: course.price,
        mrp: course.mrp,
        discounted_price: course.discounted_price,
      }));

      setCourses(processedCourses);
    } catch (err) {
      console.warn(
        "API unavailable for courses, showing empty state:",
        err.message,
      );
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSlideIndex(0);
  }, [activeCategory, courses.length]);

  return (
    <section className="relative w-full bg-background py-12 md:py-24 lg:py-14 px-4 md:px-6 overflow-hidden font-sans transition-colors duration-300">
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 400C150 350 300 450 450 400C600 350 750 450 900 400C1050 350 1200 450 1350 400C1500 350 1650 450 1800 400"
            stroke="#6B46E5"
            strokeWidth="1"
          />
          <path
            d="M0 450C150 400 300 500 450 450C600 400 750 500 900 450C1050 400 1200 500 1350 450"
            stroke="#6B46E5"
            strokeWidth="0.5"
          />
          <path
            d="M0 350C150 300 300 400 450 350C600 300 750 400 900 350C1050 300 1200 400 1350 350"
            stroke="#6B46E5"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16 lg:mb-8 space-y-3 md:space-y-4 lg:space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

            <span className="text-[11px] md:text-[13px] font-semibold text-foreground uppercase tracking-[0.2em]">
              LEARNING HUB
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight leading-tight"
          >
            {categories.length > 0
              ? `Explore ${categories.length} Training Categories`
              : "Stay Connected, Keep Training"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-sm md:text-base lg:text-lg font-medium max-w-3xl mx-auto px-4"
          >
            Discover comprehensive courses tailored to your skill level and
            career goals
          </motion.p>
        </div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-10 md:mb-16 lg:mb-8"
        >
          {categoriesLoading ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <div className="w-8 h-8 border-4 border-[#6B46E5] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-slate-500 mt-2">Loading categories...</p>
            </div>
          ) : (
            <div className="inline-flex bg-secondary p-1.5 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm max-w-full overflow-x-auto scrollbar-hide flex-nowrap md:flex-wrap">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))
              ) : (
                <p className="text-slate-400 px-6 py-2.5">
                  No categories available
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 mb-16 lg:mb-10">
          {loading && (
            <div className="col-span-full flex justify-center items-center py-16">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#6B46E5] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-slate-500">Loading courses...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="col-span-full flex justify-center items-center py-20">
              <div className="text-center space-y-4 bg-red-50 p-6 rounded-lg">
                <p className="text-red-600 font-semibold">
                  Error loading courses
                </p>
                <p className="text-slate-500 text-sm">{error}</p>
                <p className="text-slate-400 text-xs">
                  Showing default courses
                </p>
              </div>
            </div>
          )}
          {!loading && courses.length === 0 && (
            <div className="col-span-full flex justify-center items-center py-20">
              <p className="text-slate-400">
                No courses available for this category
              </p>
            </div>
          )}
          {!loading && courses.length > 0 && (
            <div
              className="col-span-full relative mb-16 lg:mb-10 touch-pan-y select-none px-2 sm:px-4 md:px-0"
              {...swipeHandlers}
            >
              {totalSlides > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={!canGoPrev}
                    aria-label="Previous courses"
                    className="absolute left-0 top-1/2 -translate-y-1/2 md:-translate-x-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border-2 border-[#7B2CFF] text-[#6B46E5] shadow-lg flex items-center justify-center hover:bg-[#6B46E5] hover:text-white hover:border-[#6B46E5] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <ChevronLeft size={22} className="md:w-6 md:h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoNext}
                    aria-label="Next courses"
                    className="absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border-2 border-[#7B2CFF] text-[#6B46E5] shadow-lg flex items-center justify-center hover:bg-[#6B46E5] hover:text-white hover:border-[#6B46E5] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <ChevronRight size={22} className="md:w-6 md:h-6" />
                  </button>
                </>
              )}
              <div className="overflow-hidden w-full min-w-0">
                <motion.div
                  className="flex"
                  style={{ width: `${totalSlides * 100}%` }}
                  animate={{
                    x: slideIndex
                      ? `-${(slideIndex / totalSlides) * 100}%`
                      : "0%",
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.4,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  {slideChunks.map((slideCourses, slideIdx) => (
                    <div
                      key={slideIdx}
                      className="flex gap-8 lg:gap-4 shrink-0 px-1 md:px-0 items-start justify-center w-full min-w-0"
                      style={{ width: `${100 / totalSlides}%`, minWidth: `${100 / totalSlides}%` }}
                    >
                      {slideCourses.map((course, idx) => (
                        <motion.div
                          key={`${slideIdx}-${idx}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 }}
                          className="shrink-0 flex-none rounded-xl border border-[#7B2CFF]/30 bg-gradient-to-b from-card to-card/95 shadow-lg shadow-gray-200/50 dark:shadow-none overflow-hidden group hover:shadow-xl hover:shadow-[#6B46E5]/15 hover:border-[#6B46E5]/50 transition-all duration-300 flex flex-col text-card-foreground max-w-[360px]"
                          style={
                            visibleCount === 1
                              ? { width: "100%" }
                              : {
                                  width: `calc((100% - ${(visibleCount - 1) * 2}rem) / ${visibleCount})`,
                                  maxWidth: "360px",
                                }
                          }
                        >
                          <div className="p-4 pb-3 space-y-4 shrink-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="bg-[#6B46E5] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                {course.category}
                              </span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-sm text-foreground font-medium">
                                  {course.rating}
                                </span>
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                                {(course.price != null ||
                                  course.discounted_price != null) && (
                                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    {course.discounted_price != null &&
                                    course.price != null &&
                                    course.discounted_price < course.price ? (
                                      <>
                                        <span className="font-semibold text-[#6B46E5]">
                                          ₹
                                          {Number(
                                            course.discounted_price,
                                          ).toLocaleString("en-IN", {
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 0,
                                          })}
                                        </span>
                                        <span className="line-through text-slate-400 dark:text-gray-500">
                                          ₹
                                          {Number(course.price).toLocaleString(
                                            "en-IN",
                                            {
                                              maximumFractionDigits: 2,
                                              minimumFractionDigits: 0,
                                            },
                                          )}
                                        </span>
                                      </>
                                    ) : (
                                      <span>
                                        ₹
                                        {Number(
                                          course.discounted_price ??
                                            course.price,
                                        ).toLocaleString("en-IN", {
                                          maximumFractionDigits: 2,
                                          minimumFractionDigits: 0,
                                        })}
                                      </span>
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                            <h3 className="text-lg font-bold text-foreground leading-snug line-clamp-3 group-hover:text-[#6B46E5] transition-colors duration-200">
                              {course.title}
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => openEnrollModal(course.title)}
                                  className="flex-1 bg-[#310E3F] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#6B46E5] transition-colors dark:bg-white dark:text-[#310E3F] dark:hover:bg-[#6B46E5] dark:hover:text-white"
                                >
                                  Enroll Now
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setBrochureCourse(course);
                                    setBrochureModalOpen(true);
                                  }}
                                  className="flex-1 border-2 border-[#6B46E5] text-[#6B46E5] py-2.5 rounded-lg text-sm font-bold hover:bg-[#6B46E5]/10 transition-colors dark:border-purple-400 dark:text-purple-300 dark:hover:bg-purple-500/10"
                                >
                                  Learn More
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => openEnquiry(true)}
                                className="w-full py-2 rounded-lg text-sm font-bold border border-[#6B46E5]/50 text-[#6B46E5] hover:bg-[#6B46E5] hover:text-white transition-colors dark:border-purple-400 dark:text-purple-300 dark:hover:bg-[#6B46E5] dark:hover:text-white"
                              >
                                Book a demo
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                                <BarChart2 size={18} className="text-[#6B46E5] dark:text-purple-400" />
                                <span className="text-xs font-medium text-slate-700 dark:text-gray-300 text-center">
                                  {course.level}
                                </span>
                              </div>
                              <div className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                                <Calendar size={18} className="text-[#6B46E5] dark:text-purple-400" />
                                <span className="text-xs font-medium text-slate-700 dark:text-gray-300 text-center">
                                  {course.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 pb-3">
                            <div className="relative aspect-[3/2] rounded-b-xl overflow-hidden ring-1 ring-black/5">
                              <Image
                                src={
                                  typeof course.image === "string"
                                    ? `${course.image}${course.image.includes("?") ? "&" : "?"}v=${course.last_modified ?? course.id ?? ""}`
                                    : course.image
                                }
                                alt={course.title}
                                fill
                                unoptimized={
                                  typeof course.image === "string" &&
                                  course.image.startsWith("http")
                                }
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
              {totalSlides > 1 && (
                <div className="flex justify-center gap-2 mt-8 lg:mt-5">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                         type="button"
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === slideIndex ? "bg-[#6B46E5] scale-125" : "bg-gray-300 dark:bg-gray-600 hover:bg-[#6B46E5]/70"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <BrochureFormModal
          open={brochureModalOpen}
          onClose={() => { setBrochureModalOpen(false); setBrochureCourse(null); }}
          brochureUrl={brochureCourse?.brochure_url || brochureCourse?.brochure}
          courseTitle={brochureCourse?.title}
        />
        <EnrollModal
          open={enrollModalOpen}
          onClose={() => setEnrollModalOpen(false)}
          courseTitle={enrollCourseTitle}
        />

        {/* View All Button */}
        <div className="flex justify-center">
          <Link href="/courses">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 md:px-10 py-3 rounded-full font-bold text-base md:text-lg hover:bg-[#6B46E5] transition-all hover:shadow-2xl"
            >
              View All
              <div className="w-6 h-6 md:w-7 md:h-7 bg-white/10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
