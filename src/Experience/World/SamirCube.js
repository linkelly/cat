import * as THREE from "three";
import Experience from "../Experience.js";

export default class SamirCube {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // add a cube to the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(0, 0, -3);
    this.scene.add(this.cube);
  }
  update() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }
}
