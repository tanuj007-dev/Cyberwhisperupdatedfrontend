export async function GET(request, { params }) {
    try {
        const { category } = await params;

        // Mock course data
        const mockCourses = {
            programming: [
                {
                    id: 1,
                    title: 'JavaScript Fundamentals',
                    rating: 4.8,
                    lessons: 25,
                    level: 'Beginner',
                    duration: '3 Weeks',
                    category: 'Programming',
                    image: '/Component/assets/cyber_lab_1.webp'
                },
                {
                    id: 2,
                    title: 'Advanced Python Programming',
                    rating: 4.6,
                    lessons: 30,
                    level: 'Intermediate',
                    duration: '4 Weeks',
                    category: 'Programming',
                    image: '/Component/assets/cyber_lab_2.webp'
                },
                {
                    id: 3,
                    title: 'Full Stack Web Development',
                    rating: 4.7,
                    lessons: 40,
                    level: 'Advanced',
                    duration: '6 Weeks',
                    category: 'Programming',
                    image: '/Component/assets/cyber_lab_3.webp'
                }
            ],
            cisco: [
                {
                    id: 4,
                    title: 'CISCO CCNA Basics',
                    rating: 4.5,
                    lessons: 35,
                    level: 'Beginner',
                    duration: '5 Weeks',
                    category: 'CISCO',
                    image: '/Component/assets/cisco.webp'
                },
                {
                    id: 5,
                    title: 'CISCO Advanced Networking',
                    rating: 4.6,
                    lessons: 40,
                    level: 'Advanced',
                    duration: '6 Weeks',
                    category: 'CISCO',
                    image: '/Component/assets/cyber_lab_4.webp'
                },
                {
                    id: 6,
                    title: 'CISCO Security Essentials',
                    rating: 4.7,
                    lessons: 28,
                    level: 'Intermediate',
                    duration: '4 Weeks',
                    category: 'CISCO',
                    image: '/Component/assets/cyber_range.webp'
                }
            ],
            'red hat': [
                {
                    id: 7,
                    title: 'Red Hat Linux Administration',
                    rating: 4.6,
                    lessons: 32,
                    level: 'Intermediate',
                    duration: '4 Weeks',
                    category: 'Red Hat',
                    image: '/Component/assets/redhat.webp'
                },
                {
                    id: 8,
                    title: 'Red Hat Enterprise Linux',
                    rating: 4.5,
                    lessons: 28,
                    level: 'Beginner',
                    duration: '3 Weeks',
                    category: 'Red Hat',
                    image: '/Component/assets/cyber_online.webp'
                },
                {
                    id: 9,
                    title: 'Red Hat Certified Engineer',
                    rating: 4.8,
                    lessons: 45,
                    level: 'Advanced',
                    duration: '8 Weeks',
                    category: 'Red Hat',
                    image: '/Component/assets/cyber_corporate.webp'
                }
            ],
            comptia: [
                {
                    id: 10,
                    title: 'CompTIA A+ Certification',
                    rating: 4.7,
                    lessons: 38,
                    level: 'Beginner',
                    duration: '5 Weeks',
                    category: 'CompTIA',
                    image: '/Component/assets/comptia.webp'
                },
                {
                    id: 11,
                    title: 'CompTIA Network+',
                    rating: 4.6,
                    lessons: 42,
                    level: 'Intermediate',
                    duration: '6 Weeks',
                    category: 'CompTIA',
                    image: '/Component/assets/cyber_map.webp'
                },
                {
                    id: 12,
                    title: 'CompTIA Security+',
                    rating: 4.8,
                    lessons: 45,
                    level: 'Advanced',
                    duration: '7 Weeks',
                    category: 'CompTIA',
                    image: '/Component/assets/cyberdefence.webp'
                }
            ],
            'microsoft azure': [
                {
                    id: 13,
                    title: 'Azure Fundamentals',
                    rating: 4.5,
                    lessons: 30,
                    level: 'Beginner',
                    duration: '4 Weeks',
                    category: 'Microsoft Azure',
                    image: '/Component/assets/Microsoft-Azure-Logo.webp'
                },
                {
                    id: 14,
                    title: 'Azure Administrator',
                    rating: 4.7,
                    lessons: 40,
                    level: 'Intermediate',
                    duration: '6 Weeks',
                    category: 'Microsoft Azure',
                    image: '/Component/assets/Microsoft-Sentinel-1.webp'
                },
                {
                    id: 15,
                    title: 'Azure Security Engineer',
                    rating: 4.8,
                    lessons: 48,
                    level: 'Advanced',
                    duration: '8 Weeks',
                    category: 'Microsoft Azure',
                    image: '/Component/assets/cyber_resilience.webp'
                }
            ],
            cybersecurity: [
                {
                    id: 16,
                    title: 'Ethical Hacking Basics',
                    rating: 4.9,
                    lessons: 35,
                    level: 'Beginner',
                    duration: '5 Weeks',
                    category: 'Cybersecurity',
                    image: '/Component/assets/cyber_lab_1.webp'
                },
                {
                    id: 17,
                    title: 'Penetration Testing',
                    rating: 4.7,
                    lessons: 42,
                    level: 'Intermediate',
                    duration: '6 Weeks',
                    category: 'Cybersecurity',
                    image: '/Component/assets/vapt.webp'
                },
                {
                    id: 18,
                    title: 'Advanced Cybersecurity',
                    rating: 4.8,
                    lessons: 50,
                    level: 'Advanced',
                    duration: '10 Weeks',
                    category: 'Cybersecurity',
                    image: '/Component/assets/cyberdefence.webp'
                }
            ]
        };

        const categoryKey = category.toLowerCase();
        const courses = mockCourses[categoryKey] || [];

        return Response.json(
            { courses },
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            }
        );
    } catch (error) {
        return Response.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}

export async function OPTIONS(request) {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
