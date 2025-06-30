using System;
using System.Security.Cryptography.X509Certificates;
using Application.Profiles.Commands;
using FluentValidation;

namespace Application.Profiles.Validator;

public class EditProfileValidator : AbstractValidator<EditProfile.Command>
{
    public EditProfileValidator()
    {
        RuleFor(x => x.DisplayName)
                .NotEmpty().WithMessage("DisplayName is required");
    }
}
