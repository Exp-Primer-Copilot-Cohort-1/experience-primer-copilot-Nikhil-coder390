function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var contact = document.getElementById("contact");
    var about = document.getElementById("about");
    var memberNav = document.getElementById("memberNav");
    var skillsNav = document.getElementById("skillsNav");
    var contactNav = document.getElementById("contactNav");
    var aboutNav = document.getElementById("aboutNav");
    member.style.display = "block";
    skills.style.display = "none";
    contact.style.display = "none";
    about.style.display = "none";
    memberNav.style.backgroundColor = "#f2f2f2";
    skillsNav.style.backgroundColor = "#fff";
    contactNav.style.backgroundColor = "#fff";
    aboutNav.style.backgroundColor = "#fff";
}