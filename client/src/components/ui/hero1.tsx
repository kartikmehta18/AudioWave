
// import { useEffect, useState } from 'react'

// export default function ModernInterface() {
//   const [dots, setDots] = useState(Array(3).fill({ opacity: 0.5 }))

//   useEffect(() => {
//     const animateDots = () => {
//       setDots(prev => 
//         prev.map(dot => ({
//           opacity: 0.3 + Math.random() * 0.7
//         }))
//       )
//     }

//     const interval = setInterval(animateDots, 1500)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="min-h-screen w-full relative overflow-hidden -mt-[500px] -z-10">
//       {/* Background gradient overlay */}
//       <div className="absolute inset-0 " />

//       {/* Center content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
//         {/* Radiating lines */}
//         <div className="absolute inset-0">
//           {[...Array(12)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute left-1/2 top-1/2 h-[1px] w-[1000px] origin-left bg-white/5"
//               style={{
//                 transform: `rotate(${i * 30}deg)`,
//                 background: '',
//               }}
//             />
//           ))}
//         </div>

//         {/* Center logo */}
//         <div className="relative p-8 rounded-2xl bg-white/10 shadow-2xl border border-white/20">
//           <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 via-purple-500 to-purple-600 rounded-lg flex items-center justify-center transform hover:scale-105 transition-transform">
//             <svg
//               viewBox="0 0 24 24"
//               className="w-10 h-10 text-white"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M13 10V3L4 14h7v7l9-11h-7z"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Right side dots and labels */}
//         <div className="absolute right-0 top-1/2 -translate-y-1/2 flex  gap-24 mr-32">
//           {dots.map((dot, i) => (
//             <div key={i} className="flex items-center gap-4">
//               <div 
//                 className="h-2 w-2 rounded-full bg-purple-400"
//                 style={{
//                   opacity: dot.opacity,
//                   boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
//                 }}
//               />
//               <span className="text-slate-400 text-sm">
//                 {i === 0 ? '.Audi' : i === 1 ? '.Chat' : '.video'}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Decorative squares */}
//         <div className="absolute top-1/4 left-1/4 w-8 h-8 border border-purple-900/30 rounded-lg grid grid-cols-2 gap-[2px] p-[2px]">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="bg-purple-900/20 rounded-sm" />
//           ))}
//         </div>
//         <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border border-purple-900/30 rounded-lg grid grid-cols-2 gap-[2px] p-[2px]">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="bg-purple-900/20 rounded-sm" />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

