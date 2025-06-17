using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }
    public class Handle(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        async Task IRequestHandler<Command>.Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken) ?? throw new Exception("Cannot find activity");
            mapper.Map(request.Activity, activity);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
