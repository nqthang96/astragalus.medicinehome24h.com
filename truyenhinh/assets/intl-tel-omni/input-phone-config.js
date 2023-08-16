input = document.getElementsByName("masked-phone"),
  errorMsg = document.getElementsByClassName("error-msg"),
  validMsg = document.getElementsByClassName("valid-msg"),
  countryInput = document.getElementsByName("countryCode");  

let errorMap = ["Helytelen", "Érvénytelen országkód", "Rövidre", "Túl hosszú", "Helytelen"];

for (let i = 0; i < input.length; i++) {
  let errorMsgItem = errorMsg[i], validMsgItem = validMsg[i];
  let inputList = input[i], countryInputItem = countryInput[i];

  let iti = window.intlTelInput(inputList, {
    utilsScript: "intl-tel-omni/js/utils.js",
    separateDialCode: true,
    onlyCountries: ["hu"],
    initialCountry: "hu",
    // geoIpLookup: async function (success, failure) {
    //   let respIp = await fetch("../https@ipinfo.io/json");
    //   let respIpJson = await respIp.json();
    //   let countryCode = ((respIpJson && respIpJson.country) ? respIpJson.country : onlyCountries[0]).toLowerCase();
    //   success(countryCode);
    //   countryInputItem.value = countryCode;
    //   omniValues();
    // },
  });


  async function countryIso2Delay() {
    let countryIso2 = await document.getElementsByClassName('iti__country');

    let getCountryIso2 = () => {
      let countryData = iti.getSelectedCountryData().iso2;
      countryInputItem.value = countryData;
    }

    let getSelectedCountryIso2 = () => {
      for (i = 0; i < countryIso2.length; i++) {
        countryIso2[i].addEventListener('click', () => {
          setTimeout(() => {
            getCountryIso2();
            omniValues();
          }, 99);
        })
      }
    };

    getSelectedCountryIso2();
  };

  countryIso2Delay();

  const reset = () => {
    inputList.classList.remove("error");
    errorMsgItem.innerHTML = "";
    errorMsgItem.classList.add("hide");
    validMsgItem.classList.add("hide");
  };


  inputList.addEventListener('input', function () {
    reset();
    if (inputList.value.trim()) {
      if (iti.isValidNumber()) {
        validMsgItem.classList.remove("hide");
      } else {
        inputList.classList.add("error");
        let errorCode = iti.getValidationError();
        console.log(errorCode);
        errorMsgItem.innerHTML = errorMap[errorCode];
        errorMsgItem.classList.remove("hide");
        if(errorCode == -99) {
          errorMsgItem.innerHTML = 'Röviden';
        };
      }
    };
  })

let formPhoneInput = document.getElementsByName('masked-phone'), phoneInputLength = formPhoneInput.length;

  while (phoneInputLength--) {
    formPhoneInput[phoneInputLength].addEventListener('keyup', () => {
      let countryPhoneCode = document.getElementsByClassName('iti__selected-dial-code'), codeLength = countryPhoneCode.length;
      let finalValue = document.getElementsByName('phone');
      while (codeLength--) {
        finalValue[codeLength].value = (countryPhoneCode[codeLength].innerHTML + formPhoneInput[codeLength].value).replace(/[^0-9]/g, '');
      }

    });
  }
}
