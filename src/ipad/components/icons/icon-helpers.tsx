export const avatars = ["crab", "dolphin", "fish", "jellyfish", "octopus", "seagull", "seahorse", "seal", "seashell", "shark", "shrimp", "starfish", "turtle", "whale"]

export const getAvailableAvatarID = (assignedAvatars: Array<string|undefined>) => {
  const availableAvatars = avatars.filter((avatar) => !assignedAvatars.includes(avatar));

  if (availableAvatars.length) {
    return availableAvatars[0];
  } else {
    return null;
  }
}