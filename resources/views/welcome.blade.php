<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>

    <script src="https://kit.fontawesome.com/47a4ef0e6d.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <style>
        .email__address__verification {
            height: 100vh;
            -ms-flex-line-pack: center;
            align-content: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;

        }
        .email__address__verification__contain {
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
                -ms-flex-direction: row;
                    flex-direction: row;
            border-radius: 40px;
            background-color: rgba(244, 243, 242, 0.94);
            height: 100%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            background-size: cover;
            font-family: Poppins;
            padding: 0;
            background-repeat: no-repeat;
            background-position: center;
            height: auto;
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
            text-align: center;
            width: 40%;
            padding: 4%;
        }
        .email__address__verification__contain .email__address__verification__body {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
                -ms-flex-direction: column;
                    flex-direction: column;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            text-align: center;
            border-radius: 40px;
            text-align: center;
        }
        .email__address__verification__contain .email__address__verification__body .check--icon {
            color: #008800;
            font-size: 5rem;
        }

        .email__address__verification__contain .email__address__verification__body .text--on--body {
            color: #666666;
            font-size: 2rem;
            font-weight: bold;
            padding: 0 0 10% 0;
        }
        .email__address__verification__contain .email__address__verification__body button {
            color: white;
            background-color: #4049A7;
            font-size: 1rem;
            border: none;
            padding: 15px 40px 15px 40px;
        }

        @media screen and (max-width: 768px) {
            .email__address__verification__contain {
            width: 70%;
            }
            .email__address__verification__contain .email__address__verification__body button {
            padding: 10px;
            }
        }

        @media screen and (max-width: 400px) {
            .email__address__verification__contain {
            width: 90%;
            }
            .email__address__verification__contain .email__address__verification__body button {
            padding: 6px;
            }
        }
    </style>
</head>
<body>
    <div class="email__address__verification" style="background-image: url('/logo/backing.png'); background-size: cover;">
        <div class="container email__address__verification__contain">
          <!--form-->
          <div class="col-12 email__address__verification__body">
              <div class="check--icon"><i class="fas fa-check"></i></div>
              <div class="text--on--body">Your email address has been verified</div>
              <div><a href="http://127.0.0.1:4200/login"><button>Continue to home <i class="fas fa-arrow-right"></i></button></a></div>
           </div>
        </div>
    </div>
</body>
<script>
  //alert
  function sweetAlert(){
        swal({
        title: "Registration Failed!",
        text: "TRY AGAIN!",
        icon: "warning",
        button: "Ok",
      }).then(function() {
          window.location = "register.html";
      });
      }
</script>
</html>
