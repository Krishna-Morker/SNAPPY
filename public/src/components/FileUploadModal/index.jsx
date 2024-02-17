import React, { useState } from "react";
import { Button, Modal, Spin, Progress } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";

export default function FileUploadModal({
  modalOpen,
  setModalOpen,
  handleImageChange,
  handleUpload,
  image,
  setImage,
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const startUpload = async () => {
    try {
      setUploading(true);

      await Promise.all([
        // Start the timeout with a shorter delay between updates
        (async () => {
          for (let i = 0; i <= 100; i += 10) {
            setUploadProgress(i);
            await new Promise((resolve) => setTimeout(resolve,400));
          }
        })(),
  
        // Start the handle upload process
        handleUpload(),
      ]);

    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setModalOpen(false);
    }
  };

  return (
    <div>
      <Modal
        title={uploading? "Adding Profile Image":"Add a Profile Image"}
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => {
            setModalOpen(false)
            setImage(null);
        }
            }
        footer={[
          <Button
            className="upload-btn"
            key="submit"
            type="primary"
            onClick={uploading ? null : startUpload}
            disabled={!image}
          >
            {uploading ? <Spin />  : "Upload Profile Picture"}
          </Button>,
        ]}
      >
        <div className="image-upload-main">
          {image && !uploading && <p>{image.name}</p>}
          {!uploading && <label className="upload-btn" htmlFor="image-upload">
            Add an Image
          </label>}
          <input hidden id="image-upload" type={"file"} onChange={handleImageChange} />
          {uploading && (
            <div className="progress-bar">
              <Progress type="circle" percent={uploadProgress} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}