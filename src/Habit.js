import moment from 'moment'

class Habit {

  constructor(id, name, instances, type, goal) {
    this.id = id
    this.name = name
    this.instances = instances.map((i) => i.created_at)
    this.goal = goal
    this.streak = this.calcStreak(this.instances)
    this.type = type ? type.toLowerCase() : ''
  }

  hasInstance(date) {
    let matches = this.instances.filter((i) => moment(i).format('MMM Do') === moment(date).format('MMM Do'))
    return matches.length > 0
  }

  flipInstance(date) {
    if (!this.hasInstance(date)) this.instances.push(date)
    else this.instances = this.instances.filter((i) => moment(i).format('MMM Do') !== moment(date).format('MMM Do'))
    this.streak = this.calcStreak(this.instances)
  }

  calcStreak(instances) {
    let cur = moment()
    let dates = instances.map((i) => moment(i).format('MMM Do'))
    let streak = 0
    while (dates.indexOf(cur.format('MMM Do')) !== -1) {
      streak++
      cur = cur.subtract(1, 'days')
    }
    return streak
  }

}

export { Habit }