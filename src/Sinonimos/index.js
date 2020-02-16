import React, { Component } from 'react';
import { Loading, KeyboardNav, KeyboardNavItem } from 'cerebro-ui'
import styles from './styles.css';

String.prototype.captalize = function () { return this[0].toUpperCase() + this.slice(1) }

class Preview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            synonyms: {}
        };
    }


    async componentDidMount() {
        this.setState({
            synonyms: await this.getSynonyms(this.props.word)
        })
    }

    async getSynonyms(word) {
        console.log("sending request")
        let response = await fetch(`https://cors-anywhere.herokuapp.com/https://sinonimosapi.netlify.com/.netlify/functions/api/?q=${word}/`, {
            headers: { "X-Requested-With": "XMLHttpRequest" }
        });

        let responseJson = await response.json();

        if (responseJson == {}) {
            return {
                "Nenhum sinonimo foi encontrado": ["Verifique a palavra digitada"]
            }
        }

        for (let meaning of Object.keys(responseJson)) {
            responseJson[meaning] = responseJson[meaning].join(", ").captalize()
        }

        console.log("json is ready")

        return responseJson;
    }

    render() {
        let { synonyms } = this.state;
        return Object.keys(this.state.synonyms).length ? (
            <div className={styles.wrapper} id="wrapper">
                <KeyboardNav id="keyboardNav" className={styles.keyboardNav}>
                    <ul id="keyboardNav_ul_1121" className={styles.list}>
                        {
                            Object.keys(synonyms).map(s => (
                                <KeyboardNavItem className={styles.keyboardNavItem} key={s} onSelect={() => this.props.onSelect(s)}>
                                    <span className={styles.meaning}>{s}</span>
                                    <span className={styles.synonyms}>{this.state.synonyms[s]}</span>
                                </KeyboardNavItem>
                            ))
                        }
                    </ul>
                </KeyboardNav >
            </div>
        ) : <Loading />
    }
}

export default Preview;