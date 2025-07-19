import { useState, useEffect } from "react";
import "./AsanasLibrary.css"; // Assume you move your CSS here

export const asanasData = [
    {
        name: "Downward-Facing Dog",
        sanskrit: "Adhomukha Śvanāsana",
        image: "./images/Asanas/adomukhasvanasana.jpg",
        description: "A common pose in many yoga sequences that stretches and strengthens the entire body.",
        benefits: [
            "Stretches shoulders, hamstrings, calves, arches, and hands",
            "Strengthens arms and legs",
            "Calms the brain and helps relieve stress",
            "Energizes the body"
        ],
        categories: ["standing", "inversions"]
    },
    {
        name: "Cobra Pose",
        sanskrit: "Bhujangāsana",
        image: "./images/Asanas/Bhujangasana.jpg",
        description: "A gentle backbend that opens the chest and strengthens the spine.",
        benefits: [
            "Strengthens the spine",
            "Opens the chest and lungs",
            "Stimulates abdominal organs",
            "Improves mood and energy"
        ],
        categories: ["backbends"]
    },
    {
        name: "Chair Pose",
        sanskrit: "Utkaṭāsana",
        image: "./images/Asanas/Utkatasana.jpg",
        description: "A standing pose that tones the entire body, particularly strengthening the thighs.",
        benefits: [
            "Strengthens thighs, calves, and spine",
            "Stretches shoulders and chest",
            "Stimulates abdominal organs, diaphragm, and heart",
            "Builds heat in the body"
        ],
        categories: ["standing"]
    },
    {
        name: "Legs-Up-The-Wall Pose",
        sanskrit: "Viparita Karani",
        image: "./images/Asanas/Viparita Karani.jpg",
        description: "A restorative inversion that calms the nervous system and relieves tired legs.",
        benefits: [
            "Relieves tired legs and feet",
            "Gently stretches the back of the neck, front torso, and back of legs",
            "Calms the mind",
            "Relieves mild depression and anxiety"
        ],
        categories: ["inversions", "restorative"]
    },
    {
        name: "Warrior I",
        sanskrit: "Vīrabhadrāsana I",
        image: "./images/Asanas/virabadrasana.jpg",
        description: "A standing pose that builds focus, power, and stability.",
        benefits: [
            "Strengthens shoulders, arms, legs, ankles, and back",
            "Opens chest, lungs, and shoulders",
            "Improves focus and balance",
            "Builds confidence and power"
        ],
        categories: ["standing"]
    },
    {
        name: "Corpse Pose",
        sanskrit: "Śavāsana",
        image: "./images/Asanas/savasana.jpg",
        description: "A relaxation pose typically done at the end of a practice that promotes deep rest.",
        benefits: [
            "Relaxes the body",
            "Calms the mind and aids stress management",
            "Reduces headache, fatigue, and insomnia",
            "Helps lower blood pressure"
        ],
        categories: ["restorative"]
    },
    {
        name: "Easy Pose",
        sanskrit: "Sukhāsana",
        image: "./images/Asanas/sukhasana.jpg",
        description: "A simple cross-legged seated position for meditation and breathing exercises.",
        benefits: [
            "Strengthens back",
            "Stretches knees and ankles",
            "Calms the mind",
            "Opens hips"
        ],
        categories: ["seated"]
    },
    {
        name: "Standing Forward Bend",
        sanskrit: "Uttānāsana",
        image: "./images/Asanas/uttanasana.jpg",
        description: "A forward bend from a standing position that stretches the back body.",
        benefits: [
            "Stretches hamstrings, calves, and hips",
            "Strengthens thighs and knees",
            "Reduces stress, anxiety, depression, and fatigue",
            "Relieves tension in the spine, neck, and back"
        ],
        categories: ["standing", "forward-bends"]
    },
    {
        name: "Seated Forward Bend",
        sanskrit: "Paścimatānāsana",
        image: "./images/Asanas/pascimatanasana.jpg",
        description: "A seated forward fold that deeply stretches the back of the body.",
        benefits: [
            "Stretches spine, shoulders, and hamstrings",
            "Calms the brain and helps relieve stress",
            "Stimulates liver, kidneys, and ovaries",
            "Improves digestion"
        ],
        categories: ["seated", "forward-bends"]
    },
    {
        name: "Mountain Pose",
        sanskrit: "Tāḍāsana",
        image: "./images/Asanas/Tadasana.jpg",
        description: "A foundational standing pose that improves posture, balance, and body awareness.",
        benefits: [
            "Improves posture",
            "Strengthens thighs, knees, and ankles",
            "Firms abdomen and buttocks",
            "Relieves sciatica"
        ],
        categories: ["standing"]
    },
    {
        name: "Supported Headstand",
        sanskrit: "Śirsāsana",
        image: "./images/Asanas/Sirasasana.jpg",
        description: "An inversion where the body is balanced on the forearms with the crown of the head on the floor.",
        benefits: [
            "Strengthens arms, legs, and spine",
            "Tones abdominal organs",
            "Improves digestion",
            "Enhances concentration"
        ],
        categories: ["inversions"]
    },
    {
        name: "Boat Pose",
        sanskrit: "Navasana",
        image: "./images/Asanas/navasana.jpg",
        description: "A core-strengthening pose that balances the body on the sitting bones while engaging the abdominal muscles.",
        benefits: [
            "Strengthens the abdomen, hip flexors, and spine",
            "Stimulates the kidneys, thyroid and intestines",
            "Improves balance and digestion",
            "Relieves stress and enhances concentration"
        ],
        categories: ["core", "balance", "seated"]
    },
    {
        name: "Upward Plank Pose",
        sanskrit: "Purvottanasana",
        image: "./images/Asanas/purvatanasana.jpg",
        description: "A powerful backbend and arm-strengthening pose that opens up the front of the body.",
        benefits: [
            "Strengthens the arms, wrists, legs, back, and glutes",
            "Stretches the shoulders, chest, and front ankles",
            "Improves posture and spinal flexibility",
            "Energizes the body and combats fatigue"
        ],
        categories: ["backbends", "arm-balance", "seated"]
    },
    {
        name: "Revolved Triangle Pose",
        sanskrit: "Utthita Trikonasana-Parivrtti Bhedha",
        image: "./images/Asanas/Utthita Trikonosana.jpg",
        description: "A standing twist that improves balance and stretches the hamstrings.",
        benefits: [
            "Stretches and strengthens the legs",
            "Stretches the hips and spine",
            "Improves balance",
            "Stimulates abdominal organs"
        ],
        categories: ["standing", "twists"]
    },
    {
        name: "Knees-to-Chest Pose",
        sanskrit: "Apanasana",
        image: "./images/Asanas/apanasana.jpg",
        description: "A gentle pose that massages the abdominal organs and relieves tension in the lower back.",
        benefits: [
            "Releases tension in the lower back and hips",
            "Massages abdominal organs and aids digestion",
            "Reduces bloating and gas",
            "Calms the mind and relieves fatigue"
        ],
        categories: ["restorative", "supine"]
    }
];

function AsanasLibrary() {
    
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredAsanas = asanasData.filter((asana) => {
    const matchesFilter =
      activeFilter === "all" ||
      asana.categories.includes(activeFilter);
    const matchesSearch =
      asana.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asana.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asana.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main>
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Yoga Asanas Library</h1>
          <p>Explore our comprehensive collection of yoga poses and their benefits</p>
        </div>
      </section>

      <div className="asanas-container">
        <div className="search-filter">
          <div className="search-box">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search asanas..."
            />
          </div>
          <div className="category-filter">
            {["all", "standing", "seated", "forward-bends", "backbends", "twists", "inversions", "restorative"].map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? "active" : ""}`}
                onClick={() => setActiveFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="asanas-grid">
          {filteredAsanas.length === 0 ? (
            <p>No asanas found.</p>
          ) : (
            filteredAsanas.map((asana, index) => (
              <div key={index} className="asana-card animate-in">
                <div className="asana-img">
                  <div className="image-container">
                    <img
                      src={asana.image}
                      alt={asana.name}
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/300";
                        e.target.parentElement.classList.add("fallback");
                      }}
                    />
                    <div className="category-tags">
                      {asana.categories.map((cat, idx) => (
                        <span key={idx} className="category-tag">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="asana-content">
                  <h3 className="asana-title">{asana.name}</h3>
                  <div className="asana-sanskrit">{asana.sanskrit}</div>
                  <p className="asana-description">{asana.description}</p>
                  <div className="asana-benefits">
                    <div className="benefits-title">Benefits:</div>
                    <ul className="benefits-list">
                      {asana.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default AsanasLibrary;
