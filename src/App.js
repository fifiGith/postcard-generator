import React, { Component } from "react";
import dance from "./imgs/dance.gif";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import postcard1 from "./imgs/postcard1.png";
import postcard2 from "./imgs/postcard2.png";
import postcard3 from "./imgs/postcard3.png";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

class App extends Component {
    constructor(props) {
        super(props);
        this.img = React.createRef();
        this.imgContainer = React.createRef();
        this.previewImage = React.createRef();
        this.previewMessage = React.createRef();
    }

    state = {
        text: "",
        circleImg: "",
        mainImg: postcard1
    };

    componentDidMount() {
        const html = document.querySelector("html");
        document.addEventListener("DOMContentLoaded", () => {
            if (html.clientWidth / 58 > 16) {
                this.previewMessage.current.style.fontSize = "16px";
            } else {
                this.previewMessage.current.style.fontSize = html.clientWidth / 58 + "px";
            }
        });
        window.addEventListener("resize", () => {
            this.previewMessage.current.style.fontSize = this.previewImage.current.height / 34 + "px";
        });
    }

    componentDidUpdate() {}

    handleText = e => {
        this.setState({ text: e.target.value });
    };

    handleUpload = async e => {
        const file = e.target.files[0];
        this.getBase64(file).then(data => this.setState({ circleImg: data }));
    };

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    handleDownload = () => {
        // const imagedom = document.querySelector('.image-container');
        // domtoimage.toBlob(this.imgContainer.current).then(function(img) {
        //     // var image = new Image();
        //     // image.src = img;
        //     // var w = window.open("");
        //     // w.document.write(image.outerHTML, 'Image');
        //     // console.log(img)
        //     // window.open(img, '_blank')
        //     saveAs(img, "postcard.png");
        //     // window.saveAs(img, )
        //     // let data = img;
        //     // let w = window.open("about:blank");
        //     // let image = new Image();
        //     // image.src = data;
        //     // setTimeout(function() {
        //     //     w.document.write(image.outerHTML);
        //     // }, 0);

        //     // window.location.href = img
        // });

        domtoimage.toPng(this.imgContainer.current).then(function(dataUrl) {
            var link = document.createElement("a");
            link.download = "postcard.png";
            link.href = dataUrl;
            link.click();
        });

        // const div = this.imgContainer.current;
        // console.log(div)
        // var image = div.toDataURL("image/png").replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
        // window.location.href = image;
    };

    selectImg = e => {
        this.setState({ mainImg: e.target.src });
    };

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="text-center text-lg font-bold">Postcard Generator</div>
                    <div className="flex justify-center mt-4">
                        <img src={dance} style={{ width: "64px", height: "64px" }} alt="logo" />
                    </div>
                    <div className="border shadow-lg rounded-lg p-8 my-6">
                        <div className="border mb-2 p-2 flex">
                            <div onClick={this.selectImg}>
                                <img src={postcard1} name="postcard1" alt="postcard1" />
                            </div>
                            <div onClick={this.selectImg}>
                                <img src={postcard2} name="postcard2" alt="postcard2" />
                            </div>
                            <div onClick={this.selectImg}>
                                <img src={postcard3} name="postcard3" alt="postcard3" />
                            </div>
                        </div>
                        <div className="w-full ">
                            <div className="relative">
                                <img src={this.state.mainImg} alt="mainImg" ref={this.previewImage} />

                                <div className="absolute message" ref={this.previewMessage}>
                                    <pre>{this.state.text}</pre>
                                </div>
                                <img className="absolute circle-image" src={this.state.circleImg} alt="" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="mt-4"></div>
                            <TextField
                                id="text-field"
                                label="Multiline"
                                multiline
                                rows="4"
                                variant="outlined"
                                onChange={this.handleText}
                                value={this.state.text}
                            />
                            <div className="mt-4"></div>
                            <div className="flex justify-end">
                                <Button component="label" variant="contained" color="primary" startIcon={<CloudUploadIcon />}>
                                    อัพโหลดรูปใส่กรอบ
                                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={this.handleUpload} />
                                </Button>
                                <Button
                                    component="button"
                                    onClick={this.handleDownload}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CloudDownloadIcon />}
                                >
                                    ดาวน์โหลด Postcard
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden-container">
                    <div className="relative image-container" ref={this.imgContainer}>
                        <img src={this.state.mainImg} ref={this.img} alt="mainImg" />

                        <div className="absolute big-message">
                            <pre>{this.state.text}</pre>
                        </div>
                        {this.state.circleImg ? <img className="absolute circle-image" src={this.state.circleImg} alt="" /> : ""}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
