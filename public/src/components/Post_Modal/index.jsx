import React, { useState } from "react";
import { Button, Modal, Progress } from "antd";
import "./index.css";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
}) => {

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && status.length>0) {
      sendStatus();
    }
  };
  return (
    <div onKeyDown={handleKeyPress}>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={[
          <Button
            onClick={sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            Post
          </Button>,
        ]}
      >
        <input
          className="modal-input"
          placeholder="What do you want to talk about?"
          onChange={(event)=>setStatus(event.target.value)}
          value={status}
        />
      </Modal>
    </div>
  );
};

export default ModalComponent;