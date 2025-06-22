using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using Application.Core;
using Application.Activities.DTOs;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }
    public class Handle(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        async Task<Result<Unit>> IRequestHandler<Command, Result<Unit>>.Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.ActivityDto.Id], cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
            mapper.Map(request.ActivityDto, activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Unit>.Failure("Failed to update the activity", 400);
            return Result<Unit>.Success(Unit.Value);
        }

    }
}
