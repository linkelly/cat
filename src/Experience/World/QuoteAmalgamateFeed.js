import * as THREE from "three";
import Experience from "../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default class QuoteAmalgamateFeed {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.group = new THREE.Group();
    this.group.position.set(0, 1.9, -3);
    // add a cube to the group, add the group to the scene

    this.textMaterial = new THREE.MeshMatcapMaterial();
    this.textMesh = new THREE.Mesh();
    // this.textMaterial = new THREE.MeshLambertMaterial();

    this.textMaterial.color = new THREE.Color(0xffffff);
    this.textMaterial.side = THREE.DoubleSide;
    this.textMaterial.matcap = this.resources.items.matcapTexture2;

    this.modeGeometry = new TextGeometry("Generated Mode", {
      font: this.resources.items.font,
      size: 0.5,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    this.modeGeometry.center();
    this.modeMesh = new THREE.Mesh(this.modeGeometry, this.textMaterial);
    //scale 50%
    this.modeMesh.scale.set(0.09, 0.09, 0.09);
    this.modeMesh.position.y = 0.5;
    this.group.add(this.modeMesh);

    this.cube = new THREE.Mesh(this.geometry, this.material);
    // this.group.add(this.cube);
    this.scene.add(this.group);
    this.corpus = {};
  }
  hide() {
    this.group.visible = false;
  }
  show() {
    this.group.visible = true;
    this.scene.background = new THREE.Color("black");
    this.newQuote();
    this.debugCorpus();
  }
  update() {
    this.group.rotation.y += 0.01;
  }
  newQuote() {
    this.textMesh.geometry.dispose();
    this.textMesh.material.dispose();
    this.group.remove(this.textMesh);
    let quote = [];
    let wordChoices = Object.keys(this.corpus);
    if (wordChoices.length === 0) {
      return '"No data available to generate quote"';
    }

    let currentWord =
      wordChoices[Math.floor(Math.random() * wordChoices.length)];
    quote.push(currentWord);
    console.log(currentWord);

    for (let i = 0; i < 9; i++) {
      let nextWords = this.corpus[currentWord];
      if (!nextWords || nextWords.length === 0) {
        break; // Break if there are no next words to choose from
      }
      currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
      console.log(currentWord);
      quote.push(currentWord);
    }
    quote = '"' + quote.join(" ") + '"';
    //add the quote to the scene as a text mesh
    let textGeometry = new TextGeometry(quote, {
      font: this.resources.items.font,
      size: 0.5,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    textGeometry.center();
    this.textMesh = new THREE.Mesh(textGeometry, this.textMaterial);
    this.textMesh.visible.true;
    //scale 50%
    this.textMesh.scale.set(0.09, 0.09, 0.09);
    this.textMesh.position.y = 0.0;
    this.group.add(this.textMesh);
    return quote;
  }

  addDust(inputString) {
    const words = inputString.split(" ");
    console.log(words);
    // Iterate through the array
    for (let i = 0; i < words.length - 1; i++) {
      const currentWord = words[i];
      const nextWord = words[i + 1];

      if (currentWord in this.corpus) {
        this.corpus[currentWord].push(nextWord);
      } else {
        this.corpus[currentWord] = [];
        this.corpus[currentWord].push(nextWord);
      }
    }
    this.debugCorpus();
  }
  debugCorpus() {
    console.log(this.corpus);
  }
  clearDust() {
    this.corpus = {};
  }
}
