import { defineStore } from 'pinia'
import _ from 'lodash'
import type Album from '@/types/Album'
import type Track from '@/types/Track'
import { formatTime } from '@/services/helper'
import { Howl } from 'howler'

export type PlayerState = {
  playlist: Album
  track: Track
  playing: boolean
  duration: string
  seek: string
  proggress: number
  durationInSeconds: number
  seekInSeconds: number
  proggressInSeconds: number
  sound: any | null
}

export const usePlayerStore = defineStore('player', {
  state: () =>
    ({
      playlist: {},
      track: {},
      playing: false,
      duration: '00:00',
      seek: '00:00',
      proggress: 0,
      durationInSeconds: 0,
      seekInSeconds: 0,
      proggressInSeconds: 0,
      sound: null,
    } as PlayerState),
  getters: {
    nextTrack(state) {
      const index: number | null =
        _.findIndex(state.playlist.tracks, (track: Track) => {
          return track.id === state.track.id
        }) + 1
      return _.get(this.playlist, `tracks.${index}`, null)
    },
    previousTrack(state) {
      const index: number | null =
        _.findIndex(state.playlist.tracks, (track: Track) => {
          return track.id === this.track.id
        }) - 1
      return _.get(state.playlist, `tracks.${index}`, null)
    },
  },
  actions: {
    setSeek(payload: number) {
      this.seek = formatTime(payload)
      this.seekInSeconds = payload
    },
    setProggress(payload: any) {
      this.proggress = (payload.seek / payload.duration) * 100 || 0
      this.proggressInSeconds = payload.seek
    },
    setPlaying(payload: boolean) {
      this.playing = payload
    },
    setPlaylist(payload: Album) {
      this.playlist = payload
    },
    setTrack(payload: Track) {
      this.track = payload
    },
    setDuration(payload: number) {
      this.duration = formatTime(payload)
      this.durationInSeconds = payload
    },
    setHowlSeek(payload: number) {
      if (!this.sound) {
        return false
      }
      this.sound.seek(payload)
    },
    // setHowlSeek: _.debounce(payload => {
    //   if (!this.sound) {
    //     return false
    //   }
    //   sound.seek(payload)
    // }, 300),
    setSeekInterval() {
      if (!this.sound) {
        return
      }
      let seek = this.sound.seek() || 0
      this.setProggress({ seek, duration: this.sound.duration() })
      this.setSeek(seek)

      if (this.sound.playing()) {
        setTimeout(() => {
          this.setSeekInterval()
        }, 1000)
      }
    },
    playToggle() {
      if (!this.sound) {
        return false
      }
      if (this.sound.playing()) {
        this.sound.pause()
        this.setPlaying(false)
      } else {
        this.sound.play()
        this.setPlaying(true)
      }
    },
    play({ playlist, track }: { playlist?: Album; track?: Track }) {
      if (this.sound && this.sound.playing()) {
        this.sound.stop()
      }
      if (playlist) {
        let pl = { ...playlist }
        pl.tracks = playlist.tracks.filter((t: Track) => t.src)
        this.setPlaylist(pl)
      }
      if (track) {
        this.setTrack(track)
        this.sound = new Howl({
          src: [track.src],
          html5: true,
          onend: () => {
            this.setTrack(this.nextTrack)
            this.play({ track: this.nextTrack })
          },
          onplay: () => {
            this.setPlaying(true)
            this.setDuration(this.sound.duration())
            this.setSeekInterval()
            console.log(this.nextTrack)
          },
          onpause: () => {
            this.setPlaying(false)
          },
          onstop: () => {
            this.setPlaying(false)
          },
          onseek: () => {
            // requestAnimationFrame(logSeek)
          },
        })
        if (!this.sound) {
          return
        }
        this.sound.play()
      }
    },
  },
})
