import * as THREE from "three";
import Experience from "../Experience.js";
export default class KellyKnot {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // add a cube to the scene
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(0, 0, -20);
    this.cube.scale.set(0.5, 0.5, 0.5);
    this.scene.add(this.cube);
  }

  update() {
    this.cube.rotation.x += 0.005;
    this.cube.rotation.y += 0.005;
  }
}
