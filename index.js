const BASE_URL = 'http://localhost:8000' 

let mode = 'CREATE' // default
let seledtedId = ''

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  console.log('id', id)
  if (id) {
    mode = 'EDIT'
    seledtedId = id

    // 1. เราจะดึงข้อมูล user เก่าออกมาก่อน
    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`)
      const user = response.data

      let firstNameDom = document.querySelector("input[name=firstname]");
      let lastNameDom = document.querySelector("input[name=lastname]");
      let ageDom = document.querySelector("input[name=age]");
      let descriptionDOM = document.querySelector("textarea[name=description]");

      firstNameDom.value = user.firstname
      lastNameDom.value = user.lastname
      ageDom.value = user.age
      descriptionDOM.value = user.description

      let genderDoms = document.querySelectorAll("input[name=gender]")
      let interestsDOMs = document.querySelectorAll("input[name=interest]")

      for (let i = 0; i < genderDoms.length; i++) {
        if (genderDoms[i].value == user.gender){
          genderDoms[i].checked = true
        }
      }

      for (let i = 0; i < interestsDOMs.length; i++) {
        if (user.interests.includes(interestsDOMs[i].value)){
          interestsDOMs[i].checked = true
        }
      }

    } catch (error) {
      console.log('error', error)
    }

    // 2. เราจะนำข้อมูล user กลับเข้าไปใน input html
  }
}

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

    let message = 'บันทึกข้อมูลเรียบร้อย'

    if (mode == 'CREATE') {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      console.log("response", response.data);
    } 
    else {
      const response = await axios.put(`${BASE_URL}/users/${seledtedId}`, userData);
      message = 'แก้ไขข้อมูลเรียบร้อย'
      console.log("response", response.data);
    }
    

    messageDOM.innerText = message;
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
