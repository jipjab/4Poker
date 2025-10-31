/**
 * Helper functions for converting between seconds and minutes/seconds format
 */

/**
 * Convert seconds to minutes and seconds
 */
export const secondsToMinutesAndSeconds = (seconds: number): { minutes: number; seconds: number } => {
  return {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60,
  }
}

/**
 * Convert minutes and seconds to total seconds
 */
export const minutesAndSecondsToSeconds = (minutes: number, seconds: number): number => {
  return minutes * 60 + seconds
}

