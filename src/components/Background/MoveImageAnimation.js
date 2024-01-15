export const GenerateMoveImageAnimation = (index, distance) => {
  return `@keyframes moveImage${index} {
      0% {
        transform: translate(0, 0);
      }
      25% {
        transform: translate(${distance}px, -${distance}px);
      }
      50% {
        transform: translate(${distance * 2}px, 0);
      }
      75% {
        transform: translate(${distance}px, ${distance}px);
      }
      100% {
        transform: translate(0, 0);
      }
    }`;
};

export default function GenerateRandomKeyframes(index) {
  const distance = Math.floor(Math.random() * 50) + 25;
  const duration = Math.floor(Math.random() * 4) + 2;
  const positionX = Math.floor(Math.random() * 80) + 10;

  const moveImageAnimation = GenerateMoveImageAnimation(index, distance);

  return {
    animation: `moveImage${index} ${duration}s ease-in-out infinite`,
    left: `${positionX}%`,
    ...moveImageAnimation,
  };
}
