from fastapi.testclient import TestClient

def test_health_endpoint(client: TestClient):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "version": "1.0.0"}

def test_unauthorized_endpoints(client: TestClient):
    response = client.post("/api/plan", json={"tasks": []})
    assert response.status_code == 401

def test_create_and_get_plan(client: TestClient, mock_headers: dict):
    payload = {
        "tasks": [
            {"title": "Test Task 1", "estMinutes": 45, "energy": "High", "url": "https://google.com"},
            {"title": "Test Task 2", "estMinutes": 90, "energy": "Low"}
        ],
        "workStart": "09:00",
        "workEnd": "17:00",
        "energyPeak": "High"
    }
    
    response = client.post("/api/plan", json=payload, headers=mock_headers)
    assert response.status_code == 200
    plan_data = response.json()
    assert "planId" in plan_data
    assert plan_data["totalPlannedMin"] == 135
    
    plan_id = plan_data["planId"]
    
    response_get = client.get("/api/plan/today", headers=mock_headers)
    assert response_get.status_code == 200
    today_plan = response_get.json()
    assert today_plan["planId"] == plan_id
    
    first_block = today_plan["blocks"][0]
    block_id = first_block["blockId"]
    
    step_payload = {
        "blockId": block_id,
        "stepIdx": 0
    }
    
    response_complete = client.post("/api/step/complete", json=step_payload, headers=mock_headers)
    assert response_complete.status_code == 200
    log_entry = response_complete.json()
    assert log_entry["blockId"] == block_id
    assert log_entry["stepIdx"] == 0
    
    response_logs = client.get("/api/logs?limit=5", headers=mock_headers)
    assert response_logs.status_code == 200
    logs = response_logs.json()
    assert len(logs) >= 1
    assert logs[0]["blockId"] == block_id
