export interface Status {
  current_time: string
  host: string
}

export const getStatus = (host: string): Status => ({
  current_time: new Date().toISOString(),
  host,
})
