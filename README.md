# 🎨 Real-Time Collaborative Infinite Whiteboard (Miro Clone)
```
This project was developed during the Winter Internship '25 at console.success.
```

## 🚀 Overview
This project is an advanced **Real-Time Collaborative Whiteboard** built as part of the Frontend Development Advanced Track. It mimics core functionalities of tools like Miro or Excalidraw, allowing multiple users to draw, write, and collaborate on an infinite canvas with zero latency.

The core engineering challenges addressed in this project include **Coordinate System Transformations** (Screen vs. Canvas), **WebSocket Synchronization**, and **Conflict Resolution** (Object Locking).

## ✨ Key Features

* **♾️ Infinite Canvas:** Infinite Panning (Space/Hand Tool) and Zooming (Mouse Wheel) with precise coordinate mapping.
* **⚡ Real-Time Synchronization:** Powered by `Socket.io`, all actions (drawing, moving, deleting) are broadcast instantly to all connected users.
* **👥 Multi-User Presence:** Real-time cursor tracking shows where other users are on the canvas.
* **🛠️ Robust Toolset:**
    * **Rectangle:** Vector shape drawing.
    * **Pencil:** Freehand drawing with smoothing.
    * **Text:** Add text annotations anywhere.
    * **Sticky Notes:** Quickly add ideas to the board.
* **🔒 Conflict Resolution (Object Locking):** Implements a locking mechanism where objects become "locked" (red border) for others while a user is dragging them, preventing sync glitches.
* **🚀 Optimistic UI:** Updates local state immediately while syncing in the background for a lag-free experience.

## 🛠️ Tech Stack

### Frontend
* **React.js:** Component-based UI structure.
* **React-Konva:** High-performance Canvas rendering for vector shapes.
* **Konva.js:** Handling 2D context, hit detection, and layering.
* **CSS3:** Custom floating toolbar with modern styling.

### Backend
* **Node.js & Express:** Lightweight server environment.
* **Socket.io:** Handling bidirectional, low-latency communication events.
* **In-Memory Store:** Manages current state of elements and locks.

## ⚙️ Installation & Run Locally

This project uses a monorepo-style structure with separate `client` and `server` directories.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/miro-clone.git](https://github.com/your-username/miro-clone.git)
cd miro-clone
