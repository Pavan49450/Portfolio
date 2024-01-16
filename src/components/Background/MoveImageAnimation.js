const generateRandomKeyframes = (index) => {
  const distances = Array.from(
    { length: 4 },
    () => Math.floor(Math.random() * 50) + 25 // Reduce maximum distance to prevent going beyond the screen
  );

  return `@keyframes moveImage${index} {
    0% { transform: translate(0, 0); }
    25% { transform: translate(${distances[0]}%, -${distances[1]}%); }
    50% { transform: translate(${distances[2]}%, ${distances[3]}%); }
    75% { transform: translate(${distances[0]}%, ${distances[1]}%); }
    100% { transform: translate(0, 0); }
  }`;
};

export default generateRandomKeyframes;
