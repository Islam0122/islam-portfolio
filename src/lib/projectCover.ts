import type { Project } from '../types'

/** The image that represents a project: its video poster, otherwise its first screenshot. */
export function projectCover(project: Project): string | undefined {
  return project.video?.poster ?? project.videoPending?.poster ?? project.images[0]?.src
}
