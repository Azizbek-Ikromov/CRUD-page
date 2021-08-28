function Convert({ timestamp }) {
  if (timestamp) {
    const str = String(timestamp);
    if (str.length == 10 || str.length == 9) {
      let d = new Date(timestamp * 1000),
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),
        dd = ('0' + d.getDate()).slice(-2),
        time;
      time = yyyy + '-' + mm + '-' + dd;
      return time;
    } else {
      let d = new Date(timestamp),
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),
        dd = ('0' + d.getDate()).slice(-2),
        time;
      time = yyyy + '-' + mm + '-' + dd;
      return time;
    }
  } else {
    return '--------'
  }
}
export default Convert