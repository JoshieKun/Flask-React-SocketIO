import React, { Component } from 'react';
import File from './File';

export default class DropFileInput extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			chunk_size: 64 * 1024,
			files: [],
			uploading: false
		}
	}
	
	handlerOnDragOver = event => {
		event.preventDefault();
	};
	
	handlerOnDrop = event => {
		event.preventDefault();
		
		let array_files = [];
		
		for (let i = 0; i < event.dataTransfer.files.length; i++) {
			array_files.push(event.dataTransfer.files[i]);
		}
		
		this.setState({files: [...this.state.files, ...array_files]});
		
		this.setState({uploading: false});
	};
	
	toggleUpload = () => {
		this.setState({uploading: !this.state.uploading})
	};
	
	removeFile = (index) => {
		this.setState( (prevState) => {
			const files = [...prevState.files];
			
			files.splice(index, 1);
			
			return {
				files: files
			}
		});
	};
	
	render() {
		let files = this.state.files.map((file, index) => {
			return <File file={file}
			             key={index}
			             chunk_size={this.state.chunk_size}
			             uploading={this.state.uploading}
			             clickRemove={this.removeFile.bind(this, index)}
			/>
		});
		
		return (
			<div>
				<div className="Drop-input" onDragOver={this.handlerOnDragOver} onDrop={this.handlerOnDrop}>
					Drop files here!
				</div>
				<div className="Div-files">
					{files}
				</div>
				<div className="Div-Button">
					<button onClick={this.toggleUpload} disabled={!files.length && true}>
						{!this.state.uploading ? 'Upload File' : 'Cancel'}
					</button>
				</div>
			</div>
		)
	}
}