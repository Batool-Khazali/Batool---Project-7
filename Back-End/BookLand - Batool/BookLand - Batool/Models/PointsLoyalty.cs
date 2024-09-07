﻿using System;
using System.Collections.Generic;

namespace BookLand___Batool.Models;

public partial class PointsLoyalty
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? PointsEarned { get; set; }

    public int? PointsRedeemed { get; set; }

    public virtual User? User { get; set; }
}
