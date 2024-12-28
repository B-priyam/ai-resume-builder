"use client"

export const generateRandomColor = ()=>{
    const colors = [
      "indigo-500",
      "purple-500",
      "cyan-500",
      "blue-500",
      "indigo-500",
      "sky-500",
    ];

    const direction = ["r","l","t","b"]

    const randomColor =()=>{
      return colors[Math.floor(Math.random()*colors.length)]
    } 
    const randomNumber =()=>{
      return Math.floor(Math.random()*25) 
    } 
    const randomDirection =()=>{
      return direction[Math.floor(Math.random()*direction.length)]
    }

    let gradientTypes = [
      `bg-gradient-to-${randomDirection()} from-${randomColor()} from-${randomNumber()}% via-${randomColor()} via-${randomNumber()}% to-${randomColor()} to-${randomNumber()}%`,
      `bg-gradient-to-${randomDirection()} from-${randomColor()} via-${randomColor()} to-${randomColor()}`,
      `bg-gradient-to-${randomDirection()} from-${randomColor()} to-${randomColor()}`,
    ];
    // return "hello"
    return gradientTypes[Math.floor(Math.random()*gradientTypes.length)]
}

export const templates = [
  {
    name : "first",
    image : "/project-template-2.png"
  },
  {
    name : "second",
    image : "/project-template-1.png"
  },
  {
    name : "third",
    image : "/project-template-3.png"
  },
]

