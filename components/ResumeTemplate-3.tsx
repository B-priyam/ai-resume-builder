import React from "react";

const ResumePreview3 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Outer Container */}
      <div className="w-full max-w-4xl bg-white shadow-lg border border-gray-200">
        {/* Top Header with Name */}
        <div className="bg-[#00274D] text-white p-6">
          <h1 className="text-2xl font-bold">Alyce Schneider</h1>
          <p className="text-lg font-medium">Junior Game Designer</p>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1">
            {/* Personal Info */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Personal Info
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Address: 2988 O'Wagger Lane, Seattle
              </p>
              <p className="text-sm text-gray-600 mt-1">Phone: 206-278-2720</p>
              <p className="text-sm text-gray-600 mt-1">
                E-mail: aschneider@email.com
              </p>
              <p className="text-sm text-gray-600 mt-1">
                LinkedIn: linkedin.com/in/aschneider
              </p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Skills
              </h2>
              <div className="mt-3 space-y-3">
                {[
                  { name: "Unity", level: 80 },
                  { name: "C#", level: 80 },
                  { name: "JavaScript", level: 60 },
                  { name: "Problem-solving", level: 80 },
                  { name: "Creativity", level: 100 },
                  { name: "Critical Thinking", level: 100 },
                  { name: "Analytical Skills", level: 80 },
                ].map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{skill.name}</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#00274D] h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Languages
              </h2>
              <p className="text-sm text-gray-600 mt-2">Spanish: C1</p>
              <p className="text-sm text-gray-600 mt-1">Polish: A2</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            {/* Summary */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Summary
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Goal-oriented game designer with 2+ years of experience.
                Contributed to the design, combat balance, and in-game mechanics
                of a highly successful AAA game. Designed 80+ RPG levels and
                configured 25+ quests at Game Gen. Life-long fan of HOMM3 and
                Fallout. Seeking to use storytelling skills and technical
                expertise to deliver immersive, innovative UX solutions at
                Subfire Interactive.
              </p>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Professional Experience
              </h2>
              <div className="mt-3">
                {/* Job 1 */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Junior Game Designer
                  </h3>
                  <p className="text-sm text-gray-600">
                    Game Gem | 2019-02 - Present
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>
                      Configured combat balance for 1 open-world survival RPGs,
                      running over 180 simulations across 2 levels of
                      difficulty.
                    </li>
                    <li>
                      Introduced new mechanics to the game, including
                      biome-dependent temperature debuffs and enemy resistances
                      to selected attack types.
                    </li>
                    <li>
                      Collaborated with other teams within the Design &
                      Development department to ensure a cohesive, immersive
                      player experience.
                    </li>
                  </ul>
                </div>
                {/* Job 2 */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    Level Designer
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cute Ant Productions | 2018-01 - 2019-01
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>
                      Placed loot, enemies, NPCs, and other elements in over 80
                      levels across 3 RPGs.
                    </li>
                    <li>
                      Configured parameters for 25+ quests, including over 18
                      main story missions.
                    </li>
                    <li>
                      Designed 15+ NPCs, complete with interactions featuring
                      story-altering dialogue choices.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Education
              </h2>
              <div className="mt-3 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    BSc in Simulation Science, Games, and Animation
                  </h3>
                  <p className="text-sm text-gray-600">
                    Embry-Riddle Aeronautical University | 2014 - 2017
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    Unity Game Development Certification
                  </h3>
                  <p className="text-sm text-gray-600">2018</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    Unity Certified 3D Artist Specialization
                  </h3>
                  <p className="text-sm text-gray-600">2017</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    Computer Science for Game Development
                  </h3>
                  <p className="text-sm text-gray-600">2017</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview3;
