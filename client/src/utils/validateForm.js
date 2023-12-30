
const regexPhone = new RegExp(/^\d{10}$/);

export function validPhoneNumber() {
        const phone = document.getElementById("phone").value;
        const phoneRegex = /^\d{10}$/;
        if (phoneRegex.test(phone)) {
                return true;
        } else {
                return false;
        }
}
export function validEmail() {
        const email = document.getElementById("email").value;
        const emailRegex = /\S+@\S+\.\S+/;
        if (emailRegex.test(email)) {
                return true;
        } else {
                return false;
        }
}
export function validPassword() { 
        const password = document.getElementById("password").value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passwordRegex.test(password)) {
                return true;
        } else {
                return false;
        }
}