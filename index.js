const validateData = (userData) => {
  let errors = []

  if (!userData.firstname) {
    errors.push('กรุณาใส่ชื่อจริง')
  }

  if (!userData.lastname) {
    errors.push('กรุณาใส่นามสกุล')
  }

  if (!userData.age) {
    errors.push('กรุณาใส่อายุ')
  }

  if (!userData.gender) {
    errors.push('กรุณาใส่เพศ')
  }

  if (!userData.interests) {
    errors.push('กรุณาใส่ความสนใจ')
  }

  if (!userData.description) {
    errors.push('กรุณาใส่รายละเอียด')
  }

  return errors
}

const submitData = async () => {
  let firstNameDom = document.querySelector("input[name=firstname]");
  let lastNameDom = document.querySelector("input[name=lastname]");
  let ageDom = document.querySelector("input[name=age]");

  let genderDom = document.querySelector("input[name=gender]:checked") || {};
  let interestsDOMs = document.querySelectorAll("input[name=interest]:checked") || [];

  let descriptionDOM = document.querySelector("textarea[name=description]");

  let messageDOM = document.getElementById("message");

  try {
    let interest = "";

    for (let i = 0; i < interestsDOMs.length; i++) {
      if (i == interestsDOMs.length - 1) {
        interest += interestsDOMs[i].value;
      } else {
        interest += interestsDOMs[i].value + ", ";
      }
    }

    let userData = {
      firstname: firstNameDom.value,
      lastname: lastNameDom.value,
      age: ageDom.value,
      gender: genderDom.value,
      interests: interest,
      description: descriptionDOM.value,
    };

    console.log("submit data", userData);

    // const errors = validateData(userData)

    // if (errors.length > 0) {
    //   // มี error เกิดขึ้น
    //   throw {
    //     message: 'กรอกข้อมูลไม่ครบ',
    //     errors: errors
    //   }
    // }

    const response = await axios.post("http://localhost:8000/users", userData);
    console.log("response", response.data);

    messageDOM.innerText = "บันทึกข้อมูลเรียบร้อย";
    messageDOM.className = "message success";
  } catch (error) {
    console.log('error message', error.message)
    console.log('error', error.errors)

    if (error.response) {
      console.log(error.response);
      error.message = error.response.data.message
      error.errors = error.response.data.errors
    }

    let htmlData = '<div>'
    htmlData += `<div>${error.message}</div>`
    htmlData += '<ul>'
    for (let i = 0; i < error.errors.length; i++) {
      htmlData += `<li>${error.errors[i]}</li>`
    }
    htmlData += '</ul>'
    htmlData += '</div>'

    messageDOM.innerHTML = htmlData
    messageDOM.className = "message danger";
  }
};
