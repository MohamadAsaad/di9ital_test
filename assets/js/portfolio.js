document.addEventListener('DOMContentLoaded', () => {

  const projectData = {
    project1: {
      title: "متجر إلكتروني متخصص بالقهوة",
      description: "متجر إلكتروني حديث تم تطويره لماركة قهوة فاخرة. يوفر المتجر تجربة مستخدم سلسة بدءاً من تصفح المنتجات، إضافتها للسلة، وانتهاءً بعملية دفع آمنة وسريعة. تم التركيز على تصميم جذاب يعكس هوية العلامة التجارية.",
      image: "assets/img/Portfolio/dent.png",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      link: "#"
    },
    project2: {
      title: "موقع تعريفي لشركة SaaS",
      description: "موقع إلكتروني عصري لشركة ناشئة تقدم برمجيات كخدمة (SaaS). الهدف من الموقع هو التعريف بالمنتج ومميزاته، وتحويل الزوار إلى عملاء محتملين من خلال تصميم يركز على سهولة الاستخدام ودعوات واضحة لاتخاذ إجراء.",
      image: "assets/img/Portfolio/prsteel.png",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      link: "#"
    },
    project3: {
      title: "لوحة تحكم لتطبيق ويب",
      description: "لوحة تحكم تفاعلية لتحليل البيانات وعرض المقاييس الهامة. تم تصميمها لتكون سريعة الاستجابة وسهلة الفهم، مع رسوم بيانية ديناميكية تساعد صناع القرار على متابعة الأداء بكفاءة.",
      image: "assets/img/Portfolio/alaseel.png",
      technologies: ["Vue.js", "Chart.js", "Firebase", "Vuetify"],
      link: "#"
    },

    project4: {
      title: "نظام قائمة طعام إلكترونية مع لوحة تحكم ديناميكية",
      description: "نظام ويب متكامل لإدارة قائمة طعام مطعم إلكترونية. يوفر المشروع واجهة تفاعلية للزبائن لتصفح القائمة، إضافة الطلبات، وإرسالها مباشرة عبر واتساب. كما يتضمن لوحة تحكم آمنة للمسؤول تتيح تعديل كامل محتوى القائمة، بما في ذلك الأقسام والأصناف، وإعادة ترتيبها بسهولة.",
      images: [
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80"
      ],
      video: "https://www.youtube.com/embed/XnxxrhgKfPI", // غيّر للرابط الفعلي إن توفر
      technologies: ["HTML5", "CSS3", "JavaScript (ES6)", "Bootstrap 5", "PHP", "JSON", "SortableJS", "Sessions"],
      link: "https://your-live-project.com"
    }

  };

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalProjectTitle");
  const modalImage = document.getElementById("modalProjectImage");
  const modalDescription = document.getElementById("modalProjectDescription");
  const modalTech = document.getElementById("modalProjectTech");
  const modalLink = document.getElementById("modalProjectLink");
  const closeButton = document.querySelector(".close-button");
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      const projectId = card.getAttribute("data-project");
      const data = projectData[projectId];

      modalTitle.textContent = data.title;
      const modalGallery = document.getElementById("modalMediaGallery");
      modalGallery.innerHTML = ""; // Clear previous content

      if (data.images && data.images.length > 0) {
        data.images.forEach(src => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = data.title;
          img.classList.add("modal-gallery-img");
          modalGallery.appendChild(img);
        });
      }

      if (data.video) {
        const videoWrapper = document.createElement("div");
        videoWrapper.classList.add("video-wrapper");
        videoWrapper.innerHTML = `
        <iframe width="100%" height="315" src="${data.video}" 
            title="فيديو المشروع" frameborder="0" allowfullscreen></iframe>
    `;
        modalGallery.appendChild(videoWrapper);
      }

      modalImage.alt = data.title;
      modalDescription.textContent = data.description;
      modalLink.href = data.link;

      modalTech.innerHTML = ""; // Clear previous tags
      data.technologies.forEach(tech => {
        const techTag = document.createElement("span");
        techTag.textContent = tech;
        modalTech.appendChild(techTag);
      });

      modal.style.display = "block";
    });
  });

  const closeModal = () => {
    modal.style.display = "none";
  }

  closeButton.addEventListener("click", closeModal);

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });
});