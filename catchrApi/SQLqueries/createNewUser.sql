INSERT INTO
    user (
        username, email_address, password, user_type_id
    )
VALUES (
        "${username}", "${email}", "${hashedPassword}", 1
    )