using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string DisplayName { get; set; }
        public required string Bio { get; set; }
    }
    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            if (user == null) return Result<Unit>.Failure("User not found", 404);
            user.DisplayName = request.DisplayName;
            user.Bio = request.Bio;
            context.Entry(user).State = EntityState.Modified;
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Unit>.Failure("Failed to update profile", 400);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
