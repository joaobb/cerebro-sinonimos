// import React, { Component } from 'react';

export default class Sinonimus extends Component {
  constructor() {
    super()
    this.state = {
      text: ""
    }
  }

  componentDidMount() {
    this.setState({
      text: this.fun("pensar")
    })
  }

 fun = async (sinonimo) => {
    if (!sinonimo) return
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.sinonimos.com.br/${sinonimo}/`)
    let html = await response.text()

    let parser = new DOMParser()
    let doc = await parser.parseFromString(html, "text/html")

    let sen = doc.querySelectorAll('.sentido')
    let asd = ""
    sen.forEach(s => {
      asd += `${s.innerText} ${s.nextElementSibling.innerText}`
    })
    console.log(asd)
    return asd
}

  render() {
    return (
      <div className="App">
        <h1>Helo world</h1>
        {this.state.text}
      </div>
    )
  }
}

