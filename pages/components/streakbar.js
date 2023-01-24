import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

// const StreakBar = () => {
//     const [streak, setStreak] = useState(0);
//     const incrementStreak = () => setStreak(streak + 1);

//     return (
//         <div>
//             <button onClick={incrementStreak}>Practice</button>
//             <motion.div
//                 className="streak-bar"
//                 initial={{ width: `{streak}%` }}
//                 animate={{ width: `${streak}%` }}
//                 //transition={{ ease: "easeInOut", duration: 0.5 }}
//             >
//                 <div className="streak-number">{streak}</div>
//             </motion.div>
//         </div>
//     );
// };

// const StreakBar = () => {
//   const [streak, setStreak] = useState(0);
//   const incrementStreak = () => setStreak(streak + 1);
//   const [color, setColor] = useState("green");

//   useEffect(() => {
//     if(streak > 1 && streak < 5) {
//       setColor("orange");
//     } else if (streak >= 5 && streak < 10) {
//       setColor("green");
//     }
//     else if (streak == 0) {
//       setColor("red");
//     } else if(streak =>10) {
//       setColor("firebrick");
//     }
//   }, [streak])

//   return (
//       <div>
//           <button onClick={incrementStreak}>Practice</button>
//           <motion.div
//               className="streak-bar"
//               style={{width: "100px", backgroundColor: color}}
//               animate={{ backgroundColor: color }}
//               transition={{ ease: "easeInOut", duration: 0.5 }}
//           >
//               <div className="streak-number">{streak}</div>
//           </motion.div>
//       </div>
//   );
// };

const StreakBar = () => {
  const [streak, setStreak] = useState(0);
  const [color, setColor] = useState("green");
  const [lastVisit, setLastVisit] = useState(null);

  useEffect(() => {
      // check if the user has visited the site before
      const lastVisit = localStorage.getItem("lastVisit");
      if (lastVisit) {
          setLastVisit(lastVisit);
          setStreak(JSON.parse(localStorage.getItem("streak")));
      }
      // set the lastVisit to today
      localStorage.setItem("lastVisit", new Date().toDateString());
  }, []);

  

  useEffect(() => {
    // check if the user is visiting the site on a different day than the last visit
    if (lastVisit !== new Date().toDateString()) {
        setLastVisit(new Date().toDateString());
        localStorage.setItem("lastVisit", new Date().toDateString());
        setStreak(streak + 1);
        localStorage.setItem("streak", JSON.stringify(streak + 1));
    }
}, [ lastVisit ])

  return (
    <div className="streak-bar-container" style={{ position: 'absolute', top: 0, left: 0 }}>
        <motion.div
            className="streak-bar"
            style={{width: "100px", backgroundColor: color}}
            animate={{ backgroundColor: color }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
        >
            <div className="streak-number">{streak}</div>
        </motion.div>
    </div>
);
  };


export default StreakBar;
