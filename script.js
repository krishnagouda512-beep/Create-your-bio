//user input
let image = document.querySelector("#image");
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

//function working
let submit = document.querySelector("#submit");
let profile = document.querySelector("#profileID");
let downloadButton = document.querySelector("#remove");
let formFields = Array.from(document.querySelectorAll("input[required], select[required]"));
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
    lastUpdated: new Date().toISOString(),
  };

  try {
    profileData.image = await readFileAsDataUrl(image.files[0]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
  } catch (error) {
    console.error(error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
  }
}

function updateProfilePreview() {
  if (image.files.length > 0) {
    const imageUrl = URL.createObjectURL(image.files[0]);
    imageID.src = imageUrl;
  } else {
    imageID.src = "kit.jpg";
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
      return true;
    }

    const value = field.value.trim();
    return value !== "" && field.checkValidity();
  });
}

function downloadProfileAsPdf() {
  return new Promise((resolve) => {
    if (typeof window.jspdf === "undefined" || typeof window.html2canvas === "undefined") {
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

    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const PAGE_MARGIN_MM = 8;

    profile.style.display = "block";
    profile.style.width = `${A4_WIDTH_MM}mm`;
    profile.style.maxWidth = `${A4_WIDTH_MM}mm`;
    profile.style.minHeight = `${A4_HEIGHT_MM}mm`;
    profile.style.padding = "0";

    html2canvas(profile, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: Math.max(profile.scrollWidth, A4_WIDTH_MM * 3.77953),
      windowHeight: Math.max(profile.scrollHeight, A4_HEIGHT_MM * 3.77953),
    }).then((canvas) => {
      const canvasWidth = canvas.width || profile.scrollWidth;
      const canvasHeight = canvas.height || profile.scrollHeight;

      if (!canvasWidth || !canvasHeight) {
        throw new Error("Canvas size is invalid for PDF export.");
      }

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const imageData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const usableWidth = pageWidth - PAGE_MARGIN_MM * 2;
      const usableHeight = pageHeight - PAGE_MARGIN_MM * 2;
      const scale = Math.min(usableWidth / canvasWidth, usableHeight / canvasHeight);
      const width = canvasWidth * scale;
      const height = canvasHeight * scale;
      const x = (pageWidth - width) / 2;
      const y = (pageHeight - height) / 2;

      pdf.addImage(imageData, "PNG", x, y, width, height, undefined, "FAST");

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

      profile.style.width = originalWidth;
      profile.style.maxWidth = originalMaxWidth;
      profile.style.minHeight = originalMinHeight;
      profile.style.padding = originalPadding;
      profile.style.display = originalDisplay;
      resolve(true);
    }).catch((error) => {
      console.error("PDF generation failed:", error);
      profile.style.width = originalWidth;
      profile.style.maxWidth = originalMaxWidth;
      profile.style.minHeight = originalMinHeight;
      profile.style.padding = originalPadding;
      profile.style.display = originalDisplay;
      resolve(false);
    });
  });
}

function updateSubmitButton() {
  submit.disabled = !isFormValid();
}

submit.disabled = !isFormValid();
formFields.forEach((field) => {
  field.addEventListener("input", updateSubmitButton);
  field.addEventListener("change", updateSubmitButton);
  field.addEventListener("blur", updateSubmitButton);
});

phoneNumber.addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, "");
  updateSubmitButton();
});

pin.addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, "");
  updateSubmitButton();
});

function showProfileAsA4() {
  profile.style.position = "fixed";
  profile.style.top = "20px";
  profile.style.left = "50%";
  profile.style.transform = "translateX(-50%)";
  profile.style.width = "210mm";
  profile.style.maxWidth = "calc(100vw - 32px)";
  profile.style.minHeight = "297mm";
  profile.style.height = "auto";
  profile.style.padding = "20px 0";
  profile.style.display = "block";
}

submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (submit.disabled) {
    return;
  }

  updateProfilePreview();
  saveProfileToLocalStorage();
  showProfileAsA4();
});

downloadButton.addEventListener("click", async () => {
  saveProfileToLocalStorage();
  showProfileAsA4();

  await downloadProfileAsPdf();
  profile.style.display = "none";
});
