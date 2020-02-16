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

    componentDidMount() {
        this.updateState();
    }

    componentDidUpdate(prevProps) {
        if (this.props.word !== prevProps.word) {
            this.updateState();
        }
    }

    updateState() {
        this.getSynonyms(this.props.word).then(newSynonyms => {
            this.setState({
                synonyms: newSynonyms
            })
        });
    }

    async getSynonyms(word) {
        let response = await fetch(`https://sinonimosapi.netlify.com/.netlify/functions/api/?q=${word}/`);

        let responseJson = await response.json();

        if (!Object.keys(responseJson).length) {
            console.log("No synonyms were found");
            return {
                "Nenhum sinonimo foi encontrado": ["Verifique a palavra digitada"]
            }
        };

        for (let meaning of Object.keys(responseJson)) {
            responseJson[meaning] = responseJson[meaning].join(", ").captalize()
        };
        return responseJson;
    }

    render() {
        let { synonyms } = this.state;
        return Object.keys(this.state.synonyms).length ? (
            <div id="wrapper" className={styles.wrapper}>
                <KeyboardNav id="keyboardNav" className={styles.keyboardNav}>
                    <ul id="synonymsList" className={styles.list}>
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