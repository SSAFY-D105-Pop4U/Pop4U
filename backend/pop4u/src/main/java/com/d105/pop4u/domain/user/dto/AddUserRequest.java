package com.d105.pop4u.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddUserRequest {
    private String userEmail;
    private String userPassword;
    private String userName;
    private String userTelephone;
}
