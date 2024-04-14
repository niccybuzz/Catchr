SELECT * FROM user INNER JOIN user_types ON user.user_type_id = user_types.user_type_id WHERE username = ? OR email_address = ?;
