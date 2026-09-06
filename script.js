//user input
let image = document.querySelector("#image");
let collegeLogo = document.querySelector("#collegeLogo");
let fullName = document.querySelector("#name");
let rollNumber = document.querySelector("#rollNumber");
let dateOfBirth = document.querySelector("#dob");
let gender = document.querySelector("#gender");
let collageName = document.querySelector("#clgName");
let course = document.querySelector("#course");
let branch = document.querySelector("#branch");
let semistar = document.querySelector("#semester");
let email = document.querySelector("#email");
let phoneNumber = document.querySelector("#phone");
let adders = document.querySelector("#addres");
let city = document.querySelector("#city");
let state = document.querySelector("#state");
let pin = document.querySelector("#pin");
let skill = document.querySelector("#skill");
let hobies = document.querySelector("#hobei");
let about = document.querySelector("#about");

//profile views
let imageID = document.querySelector("#imgID");
let nameID = document.querySelector("#nameID");
let fulNameID = document.querySelector("#fullNameID");
let studentID = document.querySelector("#studentID");
let emailID = document.querySelector("#emailID");
let phoneNumberID = document.querySelector("#phoneNumberID");
let addresID = document.querySelector("#addresID");
let cityID = document.querySelector("#cityID");
let stateID = document.querySelector("#stateID");
let pinID = document.querySelector("#pinID");
let dateOfBirthID = document.querySelector("#dateOfBirthID");
let genderID = document.querySelector("#genderID");
let collegeNameID = document.querySelector("#collegeNameID");
let courseID = document.querySelector("#courseID");
let branchID = document.querySelector("#branchID");
let semisterID = document.querySelector("#semisterID");
let rollNumberID = document.querySelector("#rollNumberID");
let skillID = document.querySelector("#skillID");
let hobiesID = document.querySelector("#hobiesID");
let aboutID = document.querySelector("#aboutID");
let titleID = document.querySelector("#titleID");
let logoID = document.querySelector("#logoID");

//function working
let form = document.querySelector(".needs-validation");
let submit = document.querySelector("#submit");
let profile = document.querySelector("#profileID");
let downloadButton = document.querySelector("#remove");
let formFields = Array.from(
  document.querySelectorAll("input[required], select[required]"),
);
const STORAGE_KEY = "student-profile-data";

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read image file."));
    reader.readAsDataURL(file);
  });
}

function waitForImages(element) {
  return Promise.all(
    Array.from(element.querySelectorAll("img")).map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener(
          "error",
          () => reject(new Error(`Unable to load image: ${img.alt || "image"}`)),
          { once: true },
        );
      });
    }),
  );
}

async function saveProfileToLocalStorage() {
  const profileData = {
    fullName: fullName.value.trim(),
    rollNumber: rollNumber.value.trim(),
    dateOfBirth: dateOfBirth.value,
    gender: gender.value,
    collegeName: collageName.value.trim(),
    course: course.value.trim(),
    branch: branch.value,
    semester: semistar.value,
    email: email.value.trim(),
    phoneNumber: phoneNumber.value.trim(),
    address: adders.value.trim(),
    city: city.value.trim(),
    state: state.value.trim(),
    pin: pin.value.trim(),
    skills: skill.value.trim(),
    hobbies: hobies.value.trim(),
    bloodGroup: about.value.trim(),
    image: "",
    collegeLogo: "",
    lastUpdated: new Date().toISOString(),
  };

  try {
    [profileData.image, profileData.collegeLogo] = await Promise.all([
      readFileAsDataUrl(image.files[0]),
      collegeLogo.files[0]
        ? readFileAsDataUrl(collegeLogo.files[0])
        : Promise.resolve("logo.jpeg"),
    ]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
  } catch (error) {
    console.error(error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
  }
}

async function updateProfilePreview() {
  if (image.files.length > 0) {
    try {
      imageID.src = await readFileAsDataUrl(image.files[0]);
    } catch (error) {
      console.error("Unable to show profile image:", error);
      imageID.src = "kit.jpg";
    }
  } else {
    imageID.src = "kit.jpg";
  }

  if (collegeLogo.files.length > 0) {
    try {
      logoID.src = await readFileAsDataUrl(collegeLogo.files[0]);
    } catch (error) {
      console.error("Unable to show college logo:", error);
      logoID.src = "logo.jpeg";
    }
  } else {
    logoID.src = "logo.jpeg";
  }

  nameID.textContent = fullName.value;
  fulNameID.textContent = fullName.value;
  studentID.textContent = rollNumber.value;
  emailID.textContent = email.value;
  phoneNumberID.textContent = phoneNumber.value;
  addresID.textContent = adders.value + ", ";
  cityID.textContent = city.value + ", ";
  stateID.textContent = state.value + ", ";
  pinID.textContent = pin.value + ", ";
  dateOfBirthID.textContent = dateOfBirth.value;
  genderID.textContent = gender.value;
  collegeNameID.textContent = collageName.value;
  titleID.textContent = collageName.value;
  courseID.textContent = course.value;
  branchID.textContent = branch.value;
  semisterID.textContent = semistar.value;
  rollNumberID.textContent = rollNumber.value;
  skillID.textContent = skill.value;
  hobiesID.textContent = hobies.value;
  aboutID.textContent = about.value;

}

function isFormValid() {
  return formFields.every((field) => {
    if (field.type === "file") {
      return field.files.length > 0;
    }

    const value = field.value.trim();
    return value !== "" && field.checkValidity();
  });
}

function downloadProfileAsPdf() {
  return new Promise((resolve) => {
    if (
      typeof window.jspdf === "undefined" ||
      typeof window.html2canvas === "undefined"
    ) {
      console.warn("PDF libraries are still loading. Please try again.");
      resolve(false);
      return;
    }

    const { jsPDF } = window.jspdf;
    const originalWidth = profile.style.width;
    const originalMaxWidth = profile.style.maxWidth;
    const originalMinHeight = profile.style.minHeight;
    const originalPadding = profile.style.padding;
    const originalDisplay = profile.style.display;
    const originalPosition = profile.style.position;
    const originalLeft = profile.style.left;
    const originalRight = profile.style.right;
    const originalMargin = profile.style.margin;
    const originalTransform = profile.style.transform;
    const originalBackground = profile.style.background;

    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const exportElement = profile.cloneNode(true);
    exportElement.classList.add("pdf-export");
    exportElement.style.position = "static";
    exportElement.style.left = "0";
    exportElement.style.right = "auto";
    exportElement.style.margin = "0";
    exportElement.style.transform = "none";
    exportElement.style.display = "block";
    exportElement.style.background = "#fff";
    exportElement.style.width = `${A4_WIDTH_MM}mm`;
    exportElement.style.maxWidth = `${A4_WIDTH_MM}mm`;
    exportElement.style.height = `${A4_HEIGHT_MM}mm`;
    exportElement.style.minHeight = `${A4_HEIGHT_MM}mm`;
    exportElement.style.padding = "0";
    exportElement.style.boxSizing = "border-box";
    profile.parentNode.insertBefore(exportElement, profile.nextSibling);

    waitForImages(exportElement)
      .then(() =>
        html2canvas(exportElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          scrollX: 0,
          scrollY: 0,
          width: A4_WIDTH_MM * 3.77953,
          height: A4_HEIGHT_MM * 3.77953,
          windowWidth: A4_WIDTH_MM * 3.77953,
          windowHeight: A4_HEIGHT_MM * 3.77953,
        }),
      )
      .then((canvas) => {
        const canvasWidth = canvas.width || exportElement.scrollWidth;
        const canvasHeight = canvas.height || exportElement.scrollHeight;

        if (!canvasWidth || !canvasHeight) {
          throw new Error("Canvas size is invalid for PDF export.");
        }

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        const imageData = canvas.toDataURL("image/png");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(
          imageData,
          "PNG",
          0,
          0,
          pageWidth,
          pageHeight,
          undefined,
          "FAST",
        );

        const fileName = `${fullName.value || "student-profile"}.pdf`;
        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = fileName;
        link.rel = "noopener";
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          link.remove();
          URL.revokeObjectURL(pdfUrl);
        }, 1000);

        exportElement.remove();
        profile.style.width = originalWidth;
        profile.style.maxWidth = originalMaxWidth;
        profile.style.minHeight = originalMinHeight;
        profile.style.padding = originalPadding;
        profile.style.display = originalDisplay;
        profile.style.position = originalPosition;
        profile.style.left = originalLeft;
        profile.style.right = originalRight;
        profile.style.margin = originalMargin;
        profile.style.transform = originalTransform;
        profile.style.background = originalBackground;
        resolve(true);
      })
      .catch((error) => {
        if (exportElement && exportElement.parentNode) {
          exportElement.remove();
        }
        console.error("PDF generation failed:", error);
        profile.style.width = originalWidth;
        profile.style.maxWidth = originalMaxWidth;
        profile.style.minHeight = originalMinHeight;
        profile.style.padding = originalPadding;
        profile.style.display = originalDisplay;
        profile.style.position = originalPosition;
        profile.style.left = originalLeft;
        profile.style.right = originalRight;
        profile.style.margin = originalMargin;
        profile.style.transform = originalTransform;
        profile.style.background = originalBackground;
        resolve(false);
      });
  });
}

phoneNumber.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

pin.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

function showProfileAsA4() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  profile.style.position = "fixed";
  profile.style.top = isMobile ? "0" : "20px";
  profile.style.bottom = isMobile ? "0" : "auto";
  profile.style.left = isMobile ? "0" : "0";
  profile.style.right = "0";
  profile.style.margin = isMobile ? "0" : "0 auto";
  profile.style.transform = "none";
  profile.style.background = "#fff";
  profile.style.width = isMobile ? "100%" : "210mm";
  profile.style.maxWidth = isMobile ? "100%" : "calc(100vw - 32px)";
  profile.style.minHeight = isMobile ? "0" : "297mm";
  profile.style.height = "auto";
  profile.style.padding = isMobile ? "12px" : "20px 0";
  profile.style.display = "block";
  profile.style.overflowX = "hidden";
  profile.style.overflowY = "auto";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  form.classList.add("was-validated");

  if (!isFormValid()) {
    return;
  }

  downloadButton.style.display = "block";
  await updateProfilePreview();
  await saveProfileToLocalStorage();
  showProfileAsA4();
});

downloadButton.addEventListener("click", async () => {
  await updateProfilePreview();
  await saveProfileToLocalStorage();
  showProfileAsA4();

  await downloadProfileAsPdf();
  profile.style.display = "none";
});
