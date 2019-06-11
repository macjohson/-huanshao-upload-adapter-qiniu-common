import * as qiniu from 'qiniu-js';

class UploadAdapterUtil {
	constructor(loader, getToken, cdn) {
		this.loader = loader;
        this.getToken = getToken;
        this.cdn = cdn;
	}

	upload = async () => {
        const file = await this.loader.file;
        const token = await this.getToken();
        const _file = await this._uploadToQiniu(file,token);

        return _file;
	};

	_putExtra = (file) => {
		return {
			name: file.name,
			params: {},
			mimeType: [] || null
		};
    };
    
    _uploadConfig = {
        useCdnDomain: true
    }

	_generateKey = (file) => {
		const filename = file.name;
		const filenameArr = filename.split('.');
		const fileType = filenameArr[filenameArr.length - 1];
		const keyAddon = filenameArr[0];

		return `${(new Date()).valueOf()}_name_${keyAddon}.${fileType}`;
	};

	_uploadToQiniu = (file, token) => {
		return new Promise((resolve) => {
            const observable = qiniu.upload(file, this._generateKey(file), token,this._putExtra,this._uploadConfig);
            observable.subscribe({
                next:({total:{loaded,total}})=>{
                    this.loader.uploadTotal = total;
                    this.loader.uploaded = loaded;
                },
                complete:({key})=>{
                    resolve({default:`${this.cdn}/${key}`})
                }
            })
            
		});
	};
}

const uploadAdapter = (editor,getToken,cdn)=>{
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader)=>{
        return new UploadAdapterUtil(loader,getToken,cdn)
    }
}

export default uploadAdapter;
