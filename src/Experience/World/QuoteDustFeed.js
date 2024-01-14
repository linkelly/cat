import * as THREE from "three";
import Experience from "../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default class QuoteDustFeed {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.group = new THREE.Group();
    this.group.position.set(0, 1.9, -3);
    this.currentIndex = 0;
    // add a cube to the group, add the group to the scene

    this.textMaterial = new THREE.MeshMatcapMaterial();
    // this.textMaterial = new THREE.MeshLambertMaterial();

    // this.textMaterial.color = new THREE.Color(0xffffff);
    this.textMaterial.side = THREE.DoubleSide;
    this.textMaterial.matcap = this.resources.items.matcapTexture2;
    // add a mesh composed of a textGeometry with string "Source Mode"
    this.modeGeometry = new TextGeometry("Source Mode", {
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

    // an array of inspirationalQuotes, this.inpirationalQuotes where each element is a string of text that is unique
    this.inspirationalQuotes = [
      "Believe you can and you're halfway there.",
      "Don't watch the clock; do what it does. Keep going.",
      "The only way to do great work is to love what you do.",
      "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "Your time is limited, don't waste it living someone else's life.",
      "The only limit to our realization of tomorrow will be our doubts of today.",
      "Don't be afraid to give up the good to go for the great.",
      "In the middle of every difficulty lies opportunity.",
    ];
    this.inspirationalQuoteMeshes = [];
    this.inspirationalQuotes.forEach((quote, index) => {
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
      let textMesh = new THREE.Mesh(textGeometry, this.textMaterial);
      //scale 50%
      textMesh.scale.set(0.09, 0.09, 0.09);
      this.inspirationalQuoteMeshes.push(textMesh);
      this.inspirationalQuoteMeshes[index].visible = false;
      this.inspirationalQuoteMeshes[index].quote = quote;

      this.group.add(this.inspirationalQuoteMeshes[index]);
    });
    this.newQuote();

    this.scene.add(this.group);
  }
  hide() {
    this.group.visible = false;
  }
  show() {
    this.group.visible = true;
    this.scene.background = new THREE.Color("darkblue");
  }
  addQuoteToAmalgamate() {
    window.experience.world.QuoteAmalgamateFeed.addDust(
      this.inspirationalQuoteMeshes[this.currentIndex].quote
    );
    this.scene.background = new THREE.Color("forestgreen");
  }

  newQuote() {
    this.scene.background = new THREE.Color("darkblue");

    // random elemeht from this.inspirtaionalQuoteMeshes.visible = true
    this.inspirationalQuoteMeshes[this.currentIndex].visible = false;
    const randomIndex = Math.floor(
      Math.random() * this.inspirationalQuoteMeshes.length
    );
    this.currentIndex = randomIndex;
    this.inspirationalQuoteMeshes[this.currentIndex].visible = true;
    console.log(this.inspirationalQuoteMeshes[this.currentIndex].quote);
  }
  update() {}
}
