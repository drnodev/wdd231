document.addEventListener('DOMContentLoaded', async () => {

    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ]


        const container = document.getElementById('result');
        const info      = document.getElementById('information');

        document.getElementById("all").addEventListener('click', (e) =>{
            filterCourses('ALL')
            const {target} = e
            target.classList.add('active')
        })
        document.getElementById("wdd").addEventListener('click', (e) =>{
            filterCourses('WDD')
            const {target} = e
            target.classList.add('active')
        })
        document.getElementById("cse").addEventListener('click', (e) =>{
            filterCourses('CSE')
            const {target} = e
            target.classList.add('active')
        })
        async function filterCourses(filter = 'ALL'){
            container.innerHTML = ''
            const filtered = courses.filter(course => filter == 'ALL' || course.subject == filter )   
            const required  = filtered.reduce((count, course)=>{
                return course.credits ?  course.credits + count : count
            },0)

            filtered.map(course =>{
                container.innerHTML += `
                    <div class="course ${course.completed ? 'completed': ''}">${course.subject} ${course.number}</div>
                ` 
            })
            document.querySelectorAll('#filters button').forEach(btn => {
                btn.classList.remove('active');
            });

            info.innerHTML = ''
            info.innerHTML += `<div>The total number of course listed below is ${filtered.length}</div>`
            info.innerHTML += `<div>Credits required ${required}</div>`

        }
        filterCourses('ALL')
        document.getElementById('all').classList.add('active')
})
