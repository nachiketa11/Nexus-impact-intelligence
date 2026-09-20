from fastapi.testclient import TestClient

from backend.app import app


client = TestClient(app)


def test_health_contract() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_graph_contract() -> None:
    response = client.get("/graph")
    payload = response.json()

    assert response.status_code == 200
    assert set(payload) == {"nodes", "edges"}
    assert payload["nodes"]
    assert payload["edges"]
    assert {"id", "repository", "file", "function", "kind"} <= set(payload["nodes"][0])
    assert {"source", "target", "kind"} <= set(payload["edges"][0])


def test_bug_contract() -> None:
    response = client.post(
        "/bug", json={"bug": "Galaxy Watch disconnects after One UI update"}
    )
    payload = response.json()

    assert response.status_code == 200
    assert {
        "investigation_plan",
        "evidence_trail",
        "impacted_repositories",
        "diagnosis",
        "patch",
        "validation",
    } == set(payload)
    assert payload["investigation_plan"]
    assert payload["evidence_trail"]
    assert payload["diagnosis"]
    assert payload["patch"]
    assert payload["validation"]


def test_invalid_bug_request_uses_error_contract() -> None:
    response = client.post("/bug", json={"bug": ""})

    assert response.status_code == 422
    assert set(response.json()) == {"error", "recoverable", "next_step"}
