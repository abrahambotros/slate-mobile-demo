import React, { Component } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import {
    Block,
    State,
    Value,
} from "slate";
import { Editor } from 'slate-react-native';
// import editList from 'slate-edit-list';
import stateJson from './initialState.json';
import immutable from 'immutable';

const options = {
    types: ['categories'],
    typeItem: 'name'
}
// const plugin = editList(options);
// const plugins = [plugin];
const plugins = [];

// To update the highlighting of nodes inside the selection
// highlightedItems.suppressShouldComponentUpdate = true;

// let self;

class TextEditor extends Component {
    constructor(props) {
		super(props);
        // self = this;

		this.state = {
			state: Value.fromJSON(stateJson),
            parentItems: {}
		};
	}

    onChange({ state }) {
        console.log('STATE', state)
        this.setState({
            state
        });
    }

    call(change) {
        this.setState({
            state: this.state.state.change().call(change).state
        });
    }

    toggleListItem(event, key, state) {
        let parentItems = this.state.parentItems;
        parentItems[key] = !this.state.parentItems[key];

        // Hack to focus on editor or this would not work until one of the items is clicked.
        this.editor.focus();

        this.setState({
            parentItems: parentItems
        });
    }

    swapNodes(nodes, firstIndex, secondIndex) {
        return nodes.map((element, index) => {
            if (index === firstIndex) return nodes.get(secondIndex);
            else if (index === secondIndex) return nodes.get(firstIndex);
            else return element;
        })
    }

    onSortEnd(props, {oldIndex, newIndex}) {
        let { node, state } = props
        let document = state.document
        let updatedParentNodes = this.swapNodes(node.nodes, oldIndex, newIndex)

        let updatedParent = node.set('nodes', updatedParentNodes)
        document = document.updateNode(updatedParent)

        state = state.set('document', document)
        this.setState({ state: state })
    }

    highlightedList(props) {
          return (<FlatList
            data={ React.Children.toArray(props.children) }
            renderItem= {(val) => {
                return (val.item)
                }
            }
          />)
    }

    highlightedItems(props) {
        return (
            <TextInput style={{flex: 1}} value={'Sample'} />
        );
    }

    /**
     * @function schema
     * @todo Provide valid schema.
     */

    schema() {
        return {
        //     nodes: {
        //         categories:   props => this.highlightedList(props),
        //         name: props => this.highlightedItems(props)
        //     }
        }
    }

    /**
     * @function renderToolbar
     * @todo Fix slate-edit-list plugin errors, and re-implement with plugin
     *     here.
     */

    renderToolbar() {
        return null;
        /*
        const { wrapInList, unwrapList, increaseItemDepth, decreaseItemDepth } = plugin.changes;
        const inList = plugin.utils.isSelectionInList(this.state.state);
        const buttons = ['wrap', 'unwrap', 'increase depth', 'decrease depth']
        const buttonStyle = {
            padding: 5,
            marginHorizontal: 5,
            backgroundColor: '#bbbbbb'
        }

        return (
            <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                {buttons.map((button) => {
                   return (
                       <TouchableOpacity
                            key={button}
                            style={buttonStyle}
                            onPress={() => {}}>
                            <Text style={{ fontSize: 12 }}>{button}</Text>
                        </TouchableOpacity>
                        )
                    })
                 }
            </View>
        );
        */
    }

    handleEnterInput(event) {
        if (event.key === 'Enter') {
            const currentState = this.state.state
            const parentNode = currentState.document.nodes.get('0')
            const indexToInsert = parentNode.nodes.size
            let listNode =
            {
                "kind": "block",
                "type": "name",
                "nodes": [
                    {
                        "kind": "block",
                        "type": "paragraph",
                        "nodes": [
                            {
                                "kind": "text",
                                "ranges": [
                                    {
                                    "text": event.target.value
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }

            let state = currentState
                .change()
                .insertNodeByKey(parentNode.key, indexToInsert, listNode)
                .apply()

            this[event.target.id].value = ''
            this[event.target.id].blur()
            this.setState({ state: state })
        }
    }

    render() {

        return (
            <View style={{flex: 1, padding: 10 }}>
                {this.renderToolbar()}
                <Text style={{marginTop: 10, fontWeight: 'bold' }} >CASE TITLE</Text>
                <TextInput
                    style={{marginTop: 10}}
                    multi={true}
                    numberOfLines={2}
                    value="13 year old with a Type 1 Diabetes presenting high glucose level and heart rate."
                    onChange={() => {}}
                    placeholder="50M with h/o DM c/o substernal chest pain. Do I need an EKG?"
                />

                <Text style={{marginTop: 30, fontWeight: 'bold' }}>CASE</Text>
                <Editor
                    placeholder={'Enter some text...'}
                    ref={(editor) => { this.editor = editor; }}
                    plugins={plugins}
                    style={{flex: 0.6, height: 200, marginTop: 10, borderWidth: 1, borderColor: '#d6d7da', padding: 10 }}
                    value={this.state.state}
                    onChange={this.onChange}
                    schema={this.schema()}
                />

                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                    <TextInput
                        ref={(searchInput) => { this['searchInput'] = searchInput; }}
                        onKeyPress={this.handleEnterInput}
                        placeholder={`+ Add Observation`}
                    />

                </View>
            </View>
        );
    }
};

export default TextEditor;
