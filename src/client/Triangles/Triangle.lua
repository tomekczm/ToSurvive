-- Triangle class definition
local Triangle = {}
Triangle.__index = Triangle

-- Constants
local WORKSPACE = game.Workspace

-- Constructor
function Triangle.new()
	local self = setmetatable({}, Triangle)
	self.vertices = WORKSPACE:WaitForChild("Vertices")
	self.vertexList = self.vertices:GetChildren()
	self.wedgeTemplate = self:createWedgeTemplate()
	return self
end

-- Create wedge template
function Triangle:createWedgeTemplate()
	local wedge = Instance.new("WedgePart")
	wedge.Anchored = true
	wedge.TopSurface = Enum.SurfaceType.Smooth
	wedge.BottomSurface = Enum.SurfaceType.Smooth
	return wedge
end

-- Check if point is inside triangle
function Triangle:isPointInTriangle(point, a, b, c)
	local pointToa = Vector2.new(point.Position.X - a.Position.X, point.Position.Z - a.Position.Z)
	local pointTob = Vector2.new(point.Position.X - b.Position.X, point.Position.Z - b.Position.Z)
	local pointToc = Vector2.new(point.Position.X - c.Position.X, point.Position.Z - c.Position.Z)
	local moduleA = math.sqrt((pointToa.X)^2+(pointToa.Y)^2)
	local moduleB = math.sqrt((pointTob.X)^2+(pointTob.Y)^2)
	local moduleC = math.sqrt((pointToc.X)^2+(pointToc.Y)^2)
	-- cy = axbz − azbx
	local CrossProductY_1 = (pointToa.X * pointTob.Y) - (pointToa.Y * pointTob.X)
	local CrossProductY_2 = (pointTob.X * pointToc.Y) - (pointTob.Y * pointToc.X)
	local CrossProductY_3 = (pointToc.X * pointToa.Y) - (pointToc.Y * pointToa.X)	
	
	if CrossProductY_1 <0 or CrossProductY_2 <0 or CrossProductY_3 <0 then
		return true
	end
end

-- Check if vertices form valid triangle
function Triangle:isValidTriangle(a, b, c)
	local canMakeTriangle = true
	
	local vectorA = Vector2.new(a.Position.X - b.Position.X, a.Position.Z - b.Position.Z)	
	local vectorB = Vector2.new(a.Position.X - c.Position.X, a.Position.Z - c.Position.Z)
	local moduleA = math.sqrt((vectorA.X)^2+(vectorA.Y)^2)
	local moduleB = math.sqrt((vectorB.X)^2+(vectorB.Y)^2)
	-- cy = axbz − azbx
	local CrossProductY = (vectorA.X * vectorB.Y) - (vectorA.Y * vectorB.X)
	-- a × b = |a| |b| sin(θ) 
	-- sin(θ) = (a x b)/(|a| |b|)
	local sin = CrossProductY/(moduleA*moduleB)
	local angle = math.deg(math.asin(sin))	

	if angle > 0 then -- if the angle is higher than 180 degrees the variable angle will be a number under of 0 because the cross product will be negative
		for i, v in pairs(self.vertexList) do
			if v ~= a and v ~= b and v ~= c then
				if not self:isPointInTriangle(v, a, b, c) then
					canMakeTriangle = false
				end
			end			
		end
		if canMakeTriangle then
			return true
		end
	end
end

-- Draw 3D triangle
function Triangle:draw3dTriangle(a, b, c, parent)
	local ab, ac, bc = b - a, c - a, c - b;
	local abd, acd, bcd = ab:Dot(ab), ac:Dot(ac), bc:Dot(bc);

	if (abd > acd and abd > bcd) then
		c, a = a, c;
	elseif (acd > bcd and acd > abd) then
		a, b = b, a;
	end

	ab, ac, bc = b - a, c - a, c - b;

	local right = ac:Cross(ab).unit;
	local up = bc:Cross(right).unit;
	local back = bc.unit;

	local height = math.abs(ab:Dot(up));
	
	local w1 = self.wedgeTemplate:Clone();
	w1.Size = Vector3.new(0, height, math.abs(ab:Dot(back)));
	w1.CFrame = CFrame.fromMatrix((a + b)/2, right, up, back);
	w1.Parent = parent;
	w1.BrickColor = BrickColor.random()

	local w2 = self.wedgeTemplate:Clone();
	w2.Size = Vector3.new(0, height, math.abs(ac:Dot(back)));
	w2.CFrame = CFrame.fromMatrix((a + c)/2, -right, up, -back);
	w2.Parent = parent;
	w2.BrickColor = w1.BrickColor

	return w1, w2;
end

function Triangle:createTriangleCallback(callback)
    self.callback = callback
end

-- Process triangulation
function Triangle:triangulate()
	while #self.vertexList > 1 do
		local vertexFound = false
		
		for i, v in pairs(self.vertexList) do
			if self:processVertex(i, v) then
				vertexFound = true
				break
			end
		end
		
		if not vertexFound then
			break
		end
	end
end

-- Process individual vertex
function Triangle:processVertex(index, vertex)
	local prev, next
	
	if index == 1 then
		next = self.vertexList[index + 1]
		prev = self.vertexList[#self.vertexList]
	elseif index == #self.vertexList then
		next = self.vertexList[1]
		prev = self.vertexList[index - 1]
	else
		next = self.vertexList[index + 1]
		prev = self.vertexList[index - 1]
	end
	
	if self:isValidTriangle(vertex, next, prev) then
		self.callback(vertex.Position, next.Position, prev.Position, WORKSPACE)
		print(string.format("%s,%s,%s", vertex.Name, next.Name, prev.Name))
		table.remove(self.vertexList, index)
		return true
	end
	
	return false
end

return Triangle