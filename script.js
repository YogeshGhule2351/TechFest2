// =========================
// LOADER
// =========================

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }, 2000);
});

// =========================
// CURSOR GLOW
// =========================

const cursorGlow =
  document.querySelector(".cursor-glow");

document.addEventListener(
  "mousemove",
  (e) => {
    cursorGlow.style.left =
      e.clientX + "px";

    cursorGlow.style.top =
      e.clientY + "px";
  }
);

// =========================
// THREE JS
// =========================

gsap.registerPlugin(ScrollTrigger);

const scene =
  new THREE.Scene();

const camera =
  new THREE.PerspectiveCamera(
    75,
    window.innerWidth /
      window.innerHeight,
    0.1,
    1000
  );

const renderer =
  new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  window.devicePixelRatio
);

document
  .getElementById(
    "canvas-container"
  )
  .appendChild(renderer.domElement);

// =========================
// MAIN OBJECT
// =========================

const geometry =
  new THREE.IcosahedronGeometry(
    2,
    2
  );

const material =
  new THREE.MeshStandardMaterial({
    color: 0x00f5ff,
    wireframe: true,
  });

const sphere =
  new THREE.Mesh(
    geometry,
    material
  );

scene.add(sphere);

// =========================
// LIGHTS
// =========================

const pointLight =
  new THREE.PointLight(
    0xffffff,
    2
  );

pointLight.position.set(
  5,
  5,
  5
);

scene.add(pointLight);

const ambientLight =
  new THREE.AmbientLight(
    0xffffff,
    0.5
  );

scene.add(ambientLight);

camera.position.z = 6;

// =========================
// FLOATING PARTICLES
// =========================

const particlesGeometry =
  new THREE.BufferGeometry();

const particlesCount = 2000;

const positions =
  new Float32Array(
    particlesCount * 3
  );

for (
  let i = 0;
  i < particlesCount * 3;
  i++
) {
  positions[i] =
    (Math.random() - 0.5) * 25;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(
    positions,
    3
  )
);

const particlesMaterial =
  new THREE.PointsMaterial({
    color: 0x00f5ff,
    size: 0.03,
  });

const particles =
  new THREE.Points(
    particlesGeometry,
    particlesMaterial
  );

scene.add(particles);

// =========================
// ANIMATION LOOP
// =========================

function animate() {
  requestAnimationFrame(
    animate
  );

  sphere.rotation.x += 0.002;
  sphere.rotation.y += 0.003;

  particles.rotation.y +=
    0.0005;

  renderer.render(
    scene,
    camera
  );
}

animate();

// =========================
// SCROLL ANIMATION
// =========================

gsap.to(
  sphere.rotation,
  {
    x: 12,
    y: 18,

    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  }
);

gsap.to(
  sphere.scale,
  {
    x: 3,
    y: 3,
    z: 3,

    scrollTrigger: {
      trigger: "#timeline",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  }
);

gsap.to(
  particles.rotation,
  {
    y: 10,

    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  }
);

// =========================
// COUNTERS
// =========================

const counters =
  document.querySelectorAll(
    ".counter"
  );

const startCounter = (
  counter
) => {
  const target =
    +counter.dataset.target;

  let count = 0;

  const increment =
    target / 100;

  const update = () => {
    count += increment;

    if (count < target) {
      counter.innerText =
        Math.floor(
          count
        ).toLocaleString();

      requestAnimationFrame(
        update
      );
    } else {
      counter.innerText =
        target.toLocaleString();
    }
  };

  update();
};

const counterObserver =
  new IntersectionObserver(
    (entries) => {
      entries.forEach(
        (entry) => {
          if (
            entry.isIntersecting
          ) {
            startCounter(
              entry.target
            );

            counterObserver.unobserve(
              entry.target
            );
          }
        }
      );
    },
    {
      threshold: 0.5,
    }
  );

counters.forEach(
  (counter) =>
    counterObserver.observe(
      counter
    )
);

// =========================
// SCROLL REVEAL
// =========================

const revealElements =
  document.querySelectorAll(
    ".glass-card, .timeline-item"
  );

revealElements.forEach(
  (el) => {
    el.classList.add(
      "hidden-element"
    );
  }
);

const revealObserver =
  new IntersectionObserver(
    (entries) => {
      entries.forEach(
        (entry) => {
          if (
            entry.isIntersecting
          ) {
            entry.target.classList.add(
              "show"
            );
          }
        }
      );
    },
    {
      threshold: 0.2,
    }
  );

revealElements.forEach(
  (el) =>
    revealObserver.observe(el)
);

// =========================
// AI BUTTON
// =========================

const aiButton =
  document.getElementById(
    "aiButton"
  );

aiButton.addEventListener(
  "click",
  () => {
    alert(
      "🤖 TECHFEST AI\n\nWelcome Yogesh Ghule!\n\nThe future is loading..."
    );
  }
);

// Floating Effect

setInterval(() => {
  aiButton.animate(
    [
      {
        transform:
          "translateY(0px)",
      },
      {
        transform:
          "translateY(-10px)",
      },
      {
        transform:
          "translateY(0px)",
      },
    ],
    {
      duration: 1800,
    }
  );
}, 1800);

// =========================
// WINDOW RESIZE
// =========================

window.addEventListener(
  "resize",
  () => {
    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);

// =========================
// CONSOLE SIGNATURE
// =========================

console.log(
  "%cTECHFEST 2050 | Developed By Yogesh Ghule",
  "color:#00f5ff;font-size:18px;font-weight:bold;"
);