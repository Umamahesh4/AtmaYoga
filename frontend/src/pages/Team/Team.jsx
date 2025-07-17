import "./Team.css";
import { useState } from "react";

function Team() {
    const [activeCategory, setActiveCategory] = useState("all");

    const faculty = [
        {
            id: 1,
            name: "T.Senthil Kumar Sir",
            position: "Project Lead",
            bio: "Professor, School of Computing, Coimbatore",
            email: "t_senthilkumar@cb.amrita.edu",
            img: "https://placehold.co/400x400",
            imgAlt: "Professor Senthil Kumar in meditative pose",
            social: [
                { icon: "facebook-f", url: "#" },
                { icon: "twitter", url: "#" },
                { icon: "instagram", url: "#" },
                { icon: "linkedin-in", url: "#" }
            ]
        },
        {
            id: 2,
            name: "B.Senthil Kumar Sir",
            position: "Yoga Instructor",
            bio: "Assistant Professor, Spiritual Studies",
            email: "b_senthilkumar@cb.amrita.edu",
            img: "https://placehold.co/400x400",
            imgAlt: "Professor B. Senthil Kumar demonstrating yoga posture",
            social: [
                { icon: "facebook-f", url: "#" },
                { icon: "twitter", url: "#" },
                { icon: "instagram", url: "#" },
                { icon: "linkedin-in", url: "#" }
            ]
        }
    ];

    const students = [
        {
            id: 1,
            name: "K.Bhavya Naga Sai",
            position: "Lead Developer & Dataset",
            bio: "Bhavya combines his passion for yoga with technical expertise to create intuitive digital experiences.",
            img: "https://placehold.co/400x400",
            imgAlt: "K.Bhavya Naga Sai working on laptop",
            expertise: ["Front-end", "UX Design", "React"],
            social: [
                { icon: "facebook-f", url: "#" },
                { icon: "twitter", url: "#" },
                { icon: "github", url: "#" },
                { icon: "linkedin-in", url: "#" }
            ]
        },
        {
            id: 2,
            name: "Sharmin",
            position: "Yoga Performer & Dataset",
            bio: "Sharmin developed the machine learning algorithms that power our mood-based yoga recommendations.",
            img: "https://placehold.co/400x400",
            imgAlt: "Sharmin performing yoga outdoors",
            expertise: ["Machine Learning", "Python", "Data Analysis"],
            social: [
                { icon: "facebook-f", url: "#" },
                { icon: "twitter", url: "#" },
                { icon: "github", url: "#" },
                { icon: "linkedin-in", url: "#" }
            ]
        },
        {
            id: 3,
            name: "Rithvik",
            position: "Yoga Performer & Dataset",
            bio: "Rithvik creates beautiful, intuitive interfaces that enhance the digital yoga experience.",
            img: "https://placehold.co/400x400",
            imgAlt: "Rithvik in meditation pose",
            expertise: ["UI Design", "Figma", "Accessibility"],
            social: [
                { icon: "facebook-f", url: "#" },
                { icon: "twitter", url: "#" },
                { icon: "dribbble", url: "#" },
                { icon: "linkedin-in", url: "#" }
            ]
        }
    ];

    const renderFaculty = () => (
        <div className="faculty-row">
            {faculty.map(member => (
                <div className="team-member faculty-member" key={member.id}>
                    <div className="team-img-wrapper">
                        <img src={member.img} alt={member.imgAlt} className="team-img" />
                        <div className="member-category faculty-tag">Faculty</div>
                        <div className="social-icons">
                            {member.social.map((social, index) => (
                                <a href={social.url} key={index}><i className={`fab fa-${social.icon}`}></i></a>
                            ))}
                        </div>
                    </div>
                    <div className="team-info">
                        <h3>{member.name}</h3>
                        <p className="position">{member.position}</p>
                        <p className="bio">{member.bio}</p>
                        <div className="expertise-tags">
                            <span className="expertise-tag">{member.email}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderStudents = () => (
        <div className="students-row">
            {students.map(member => (
                <div className="team-member student-member" key={member.id}>
                    <div className="team-img-wrapper">
                        <img src={member.img} alt={member.imgAlt} className="team-img" />
                        <div className="member-category student-tag">Student</div>
                        <div className="social-icons">
                            {member.social.map((social, index) => (
                                <a href={social.url} key={index}><i className={`fab fa-${social.icon}`}></i></a>
                            ))}
                        </div>
                    </div>
                    <div className="team-info">
                        <h3>{member.name}</h3>
                        <p className="position">{member.position}</p>
                        <p className="bio">{member.bio}</p>
                        <div className="expertise-tags">
                            {member.expertise.map((tag, index) => (
                                <span className="expertise-tag" key={index}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <section className="team-container">
                <div className="sacred-geometry sacred-geometry-1"></div>
                <div className="sacred-geometry sacred-geometry-2"></div>
                <div className="om-animation om-1"></div>
                <div className="om-animation om-2"></div>
                <div className="om-animation om-3"></div>
                
                <div className="container">
                    <div className="team-section-header">
                        <h2>Our Inspiring Team</h2>
                        <p>A harmonious blend of experienced faculty and talented students coming together to create an immersive yoga experience that nurtures mind, body, and spirit.</p>
                    </div>
                    
                    <div className="team-categories">
                        <button className={`category-tab ${activeCategory === "all" ? "active" : ""}`} 
                                onClick={() => setActiveCategory("all")}>All Members</button>
                        <button className={`category-tab ${activeCategory === "faculty" ? "active" : ""}`} 
                                onClick={() => setActiveCategory("faculty")}>Faculty</button>
                        <button className={`category-tab ${activeCategory === "student" ? "active" : ""}`} 
                                onClick={() => setActiveCategory("student")}>Students</button>
                    </div>

                    
                    {(activeCategory === "all" || activeCategory === "faculty") && (
                        <div className="team-section">
                            <h3 className="section-title">Our Faculty</h3>
                            {renderFaculty()}
                        </div>
                    )}

                    {(activeCategory === "all" || activeCategory === "student") && (
                        <div className="team-section">
                            <h3 className="section-title">Our Students</h3>
                            {renderStudents()}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Team;
